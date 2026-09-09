"use client";

import { useState, useRef, useEffect, type RefObject } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReportGate } from "@/components/tools/ReportGate";
import { Calculator, TrendingUp, DollarSign, Clock, Users, Zap } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { calculateROI, type ROIInputs, type ROIResults } from "@/lib/roiModel";

const formatCurrency = (value: number) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(value);

const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(value);


const buildROISummary = (results: ROIResults): Record<string, string | number> => ({
  "3-year ROI": `${results.roiPercentage}%`,
  "Payback period": `${results.paybackMonths} months`,
  "Implementation cost": formatCurrency(results.totalCost),
  "Year 1 savings": formatCurrency(results.yearOneSavings),
  "Year 2 savings": formatCurrency(results.yearTwoSavings),
  "Year 3 savings": formatCurrency(results.yearThreeSavings),
  "Total 3-year savings": formatCurrency(results.totalThreeYearSavings),
  "Net return (3 years)": formatCurrency(results.netROI),
  "Efficiency gain": `${results.efficiencyGainPercent}%`,
  "Hours saved per year": formatNumber(results.hoursSaved),
});

interface ROIInputFormProps {
  inputs: ROIInputs;
  onInputChange: (field: keyof ROIInputs, value: string | number) => void;
  onCalculate: () => void;
}

function ROIInputForm({ inputs, onInputChange, onCalculate }: ROIInputFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2" className="flex items-center gap-2">
          <Calculator className="h-5 w-5" aria-hidden="true" />
          Your numbers
        </CardTitle>
        <CardDescription>
          Rough figures are fine. Change any of them and calculate again.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="revenue">Annual revenue</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" aria-hidden="true" />
              <Input
                id="revenue"
                type="number"
                value={inputs.annualRevenue}
                onChange={(event) => onInputChange("annualRevenue", event.target.value)}
                className="pl-10"
                placeholder="5000000"
                aria-describedby="revenue-hint"
              />
            </div>
            <span id="revenue-hint" className="sr-only">Your company&apos;s annual revenue, in US dollars</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="employees">People on the payroll</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" aria-hidden="true" />
              <Input
                id="employees"
                type="number"
                value={inputs.employeeCount}
                onChange={(event) => onInputChange("employeeCount", event.target.value)}
                className="pl-10"
                placeholder="50"
                aria-describedby="employees-hint"
              />
            </div>
            <span id="employees-hint" className="sr-only">Everyone you employ, office and field</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Average hourly rate ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" aria-hidden="true" />
              <Input
                id="hourlyRate"
                type="number"
                value={inputs.avgHourlyRate}
                onChange={(event) => onInputChange("avgHourlyRate", event.target.value)}
                className="pl-10"
                placeholder="50"
                aria-describedby="hourly-rate-hint"
              />
            </div>
            <span id="hourly-rate-hint" className="sr-only">What an hour of that time costs you, in US dollars</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inefficiencyHours">Hours a week each person loses to repeat work</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" aria-hidden="true" />
              <Input
                id="inefficiencyHours"
                type="number"
                value={inputs.inefficiencyHours}
                onChange={(event) => onInputChange("inefficiencyHours", event.target.value)}
                className="pl-10"
                placeholder="10"
                aria-describedby="inefficiency-hint"
              />
            </div>
            <span id="inefficiency-hint" className="sr-only">Hours a week the average person spends re-typing, chasing or re-checking work a machine could do</span>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="useCase">The job you would automate first</Label>
            <Select value={inputs.useCase} onValueChange={(value) => onInputChange("useCase", value)}>
              <SelectTrigger id="useCase" aria-describedby="usecase-hint">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer-service">Answering calls and messages</SelectItem>
                <SelectItem value="process-automation">Paperwork and repeat data entry</SelectItem>
                <SelectItem value="predictive-analytics">Forecasting demand or failures</SelectItem>
                <SelectItem value="content-generation">Writing quotes, reports and listings</SelectItem>
                <SelectItem value="fraud-detection">Spotting bad invoices and anomalies</SelectItem>
                <SelectItem value="recommendation-engine">Suggesting the next job or part</SelectItem>
              </SelectContent>
            </Select>
            <span id="usecase-hint" className="sr-only">The kind of work you would hand over first</span>
          </div>
        </div>

        <Button
          onClick={onCalculate}
          className="w-full mt-6 bg-primary hover:bg-primary/90"
          size="lg"
        >
          <Calculator className="mr-2 h-4 w-4" aria-hidden="true" />
          Calculate ROI
        </Button>
      </CardContent>
    </Card>
  );
}

interface ROIMetricsProps {
  results: ROIResults;
}

function ROIMetrics({ results }: ROIMetricsProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <m.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="h-full bg-muted border-brand/20 dark:border-brand/30">
          <CardHeader>
            <CardTitle as="h3" className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-brand" aria-hidden="true" />
              3-year ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand tabular-nums whitespace-nowrap" aria-label={`3-year ROI: ${results.roiPercentage} percent`}>{results.roiPercentage}%</div>
            <p className="text-sm text-muted-foreground mt-1">
              {formatCurrency(results.netROI)} left after the build is paid for
            </p>
          </CardContent>
        </Card>
      </m.div>

      <m.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="h-full bg-muted border-brand/20 dark:border-brand/30">
          <CardHeader>
            <CardTitle as="h3" className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand" aria-hidden="true" />
              Payback period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand tabular-nums whitespace-nowrap" aria-label={`Payback period: ${results.paybackMonths} months`}>{results.paybackMonths} mo</div>
            <p className="text-sm text-muted-foreground mt-1">
              Until the savings cover the cost
            </p>
          </CardContent>
        </Card>
      </m.div>

      <m.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="h-full bg-muted border-brand/20 dark:border-brand/30">
          <CardHeader>
            <CardTitle as="h3" className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-brand" aria-hidden="true" />
              Total 3-year savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand tabular-nums whitespace-nowrap" aria-label={`Total three year savings: ${formatCurrency(results.totalThreeYearSavings)}`}>{formatCurrency(results.totalThreeYearSavings)}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Before the cost of building it
            </p>
          </CardContent>
        </Card>
      </m.div>

      <m.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="h-full bg-muted border-brand/20 dark:border-brand/30">
          <CardHeader>
            <CardTitle as="h3" className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-brand" aria-hidden="true" />
              Efficiency gain
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand tabular-nums whitespace-nowrap" aria-label={`Efficiency gain: ${results.efficiencyGainPercent} percent`}>{results.efficiencyGainPercent}%</div>
            <p className="text-sm text-muted-foreground mt-1">
              {formatNumber(results.hoursSaved)} hours a year back
            </p>
          </CardContent>
        </Card>
      </m.div>
    </div>
  );
}

interface FinancialBreakdownProps {
  results: ROIResults;
}

function FinancialBreakdown({ results }: FinancialBreakdownProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle as="h3">Where the numbers come from</CardTitle>
          <CardDescription>The cost and the savings, year by year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="text-heading-4 mb-3 text-destructive">What it costs</h4>
              <div className="bg-destructive/10 rounded-md p-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Build and setup</span>
                  <span className="font-bold text-lg">{formatCurrency(results.totalCost)}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-heading-4 mb-3 text-brand">What it saves</h4>
              <div className="space-y-3">
                <div className="bg-success/10 rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Year 1</span>
                    <span className="font-bold text-lg">{formatCurrency(results.yearOneSavings)}</span>
                  </div>
                </div>
                <div className="bg-success/10 rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Year 2</span>
                    <span className="font-bold text-lg">{formatCurrency(results.yearTwoSavings)}</span>
                  </div>
                </div>
                <div className="bg-success/10 rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Year 3</span>
                    <span className="font-bold text-lg">{formatCurrency(results.yearThreeSavings)}</span>
                  </div>
                </div>
                <div className="bg-success/10 rounded-md p-4 border border-success">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total over three years</span>
                    <span className="font-bold text-xl text-success">{formatCurrency(results.totalThreeYearSavings)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="bg-muted rounded-lg p-6 border-2 border-brand/30 dark:border-brand/40">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-foreground">Net return over three years</span>
                  <span className="text-3xl font-bold text-brand">{formatCurrency(results.netROI)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </m.div>
  );
}

function ROICallToAction() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="bg-primary text-primary-foreground border-0">
        <CardContent className="p-8 text-center">
          <h3 className="text-heading-2 mb-3">These are estimates, not a quote</h3>
          <p className="mb-6 text-primary-foreground/80">
            They come from the figures you typed above, not from your books. Tell me which job you would
            automate first and I will come back with a scope and a fixed price.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact" aria-label="Book a call to discuss your AI ROI potential">
              Book a call
            </Link>
          </Button>
        </CardContent>
      </Card>
    </m.div>
  );
}

interface ROIResultsPanelProps {
  results: ROIResults;
  resultsRef: RefObject<HTMLDivElement | null>;
}

function ROIResultsPanel({ results, resultsRef }: ROIResultsPanelProps) {
  return (
    <m.div
      ref={resultsRef}
      tabIndex={-1}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 outline-none"
      role="region"
      aria-label="ROI calculation results"
      aria-live="polite"
    >
      <h2 className="sr-only">ROI Calculation Results</h2>
      <ROIMetrics results={results} />
      <ReportGate
        tool="roi-calculator"
        title="See the full financial breakdown"
        description="Your headline numbers are above. Enter your email to reveal the year-by-year savings and the cost behind them, and I will send you the same breakdown to keep."
        summary={buildROISummary(results)}
      >
        <FinancialBreakdown results={results} />
      </ReportGate>
      <ROICallToAction />
    </m.div>
  );
}

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    annualRevenue: 5000000,
    employeeCount: 50,
    avgHourlyRate: 50,
    inefficiencyHours: 10,
    useCase: "process-automation",
  });
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const results = calculateROI(inputs);

  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.focus();
    }
  }, [showResults]);

  const handleInputChange = (field: keyof ROIInputs, value: string | number) => {
    setInputs((previousInputs) => ({
      ...previousInputs,
      [field]: typeof value === "string" && field !== "useCase" ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="space-y-8" role="region" aria-label="ROI Calculator">
      <ROIInputForm
        inputs={inputs}
        onInputChange={handleInputChange}
        onCalculate={() => setShowResults(true)}
      />

      <AnimatePresence>
        {showResults ? (
          <ROIResultsPanel results={results} resultsRef={resultsRef} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
