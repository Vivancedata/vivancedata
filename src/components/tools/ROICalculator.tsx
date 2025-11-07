"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, DollarSign, Clock, Users, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ROIInputs {
  annualRevenue: number;
  employeeCount: number;
  avgHourlyRate: number;
  inefficiencyHours: number;
  useCase: string;
}

interface ROIResults {
  totalCost: number;
  yearOneSavings: number;
  yearTwoSavings: number;
  yearThreeSavings: number;
  totalThreeYearSavings: number;
  netROI: number;
  roiPercentage: number;
  paybackMonths: number;
  efficiencyGainPercent: number;
  hoursSaved: number;
}

const useCaseMultipliers: Record<string, { cost: number; savings: number; efficiency: number }> = {
  "customer-service": { cost: 1.0, savings: 1.2, efficiency: 40 },
  "process-automation": { cost: 0.9, savings: 1.5, efficiency: 50 },
  "predictive-analytics": { cost: 1.2, savings: 1.3, efficiency: 35 },
  "content-generation": { cost: 0.8, savings: 1.1, efficiency: 45 },
  "fraud-detection": { cost: 1.3, savings: 1.6, efficiency: 30 },
  "recommendation-engine": { cost: 1.1, savings: 1.4, efficiency: 25 },
};

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    annualRevenue: 5000000,
    employeeCount: 50,
    avgHourlyRate: 50,
    inefficiencyHours: 10,
    useCase: "process-automation",
  });

  const [showResults, setShowResults] = useState(false);

  const calculateROI = (): ROIResults => {
    const multiplier = useCaseMultipliers[inputs.useCase] || useCaseMultipliers["process-automation"];

    // Base implementation cost calculation
    const baseImplementationCost = 50000 + (inputs.employeeCount * 500);
    const totalCost = baseImplementationCost * multiplier.cost;

    // Annual operational savings
    const annualLaborSavings = inputs.employeeCount * inputs.inefficiencyHours * 52 * inputs.avgHourlyRate;
    const efficiencyGainPercent = multiplier.efficiency;
    const actualSavings = (annualLaborSavings * efficiencyGainPercent) / 100;

    // Year-over-year savings (compound improvements)
    const yearOneSavings = actualSavings * multiplier.savings * 0.7; // 70% realization in year 1
    const yearTwoSavings = actualSavings * multiplier.savings * 1.0; // 100% in year 2
    const yearThreeSavings = actualSavings * multiplier.savings * 1.1; // 110% in year 3

    const totalThreeYearSavings = yearOneSavings + yearTwoSavings + yearThreeSavings;
    const netROI = totalThreeYearSavings - totalCost;
    const roiPercentage = ((netROI / totalCost) * 100);

    const monthlyBreakeven = totalCost / (yearOneSavings / 12);
    const paybackMonths = Math.ceil(monthlyBreakeven);

    const hoursSaved = (inputs.employeeCount * inputs.inefficiencyHours * 52 * efficiencyGainPercent) / 100;

    return {
      totalCost: Math.round(totalCost),
      yearOneSavings: Math.round(yearOneSavings),
      yearTwoSavings: Math.round(yearTwoSavings),
      yearThreeSavings: Math.round(yearThreeSavings),
      totalThreeYearSavings: Math.round(totalThreeYearSavings),
      netROI: Math.round(netROI),
      roiPercentage: Math.round(roiPercentage),
      paybackMonths,
      efficiencyGainPercent,
      hoursSaved: Math.round(hoursSaved),
    };
  };

  const results = calculateROI();

  const handleInputChange = (field: keyof ROIInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' && field !== 'useCase' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Business Inputs
          </CardTitle>
          <CardDescription>
            Enter your business metrics to calculate potential AI ROI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="revenue">Annual Revenue</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="revenue"
                  type="number"
                  value={inputs.annualRevenue}
                  onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                  className="pl-10"
                  placeholder="5000000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employees">Number of Employees</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="employees"
                  type="number"
                  value={inputs.employeeCount}
                  onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                  className="pl-10"
                  placeholder="50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Average Hourly Rate ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="hourlyRate"
                  type="number"
                  value={inputs.avgHourlyRate}
                  onChange={(e) => handleInputChange('avgHourlyRate', e.target.value)}
                  className="pl-10"
                  placeholder="50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inefficiencyHours">Inefficiency Hours/Week per Employee</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="inefficiencyHours"
                  type="number"
                  value={inputs.inefficiencyHours}
                  onChange={(e) => handleInputChange('inefficiencyHours', e.target.value)}
                  className="pl-10"
                  placeholder="10"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="useCase">AI Use Case</Label>
              <Select value={inputs.useCase} onValueChange={(value) => handleInputChange('useCase', value)}>
                <SelectTrigger id="useCase">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer-service">Customer Service Automation</SelectItem>
                  <SelectItem value="process-automation">Process Automation</SelectItem>
                  <SelectItem value="predictive-analytics">Predictive Analytics</SelectItem>
                  <SelectItem value="content-generation">Content Generation</SelectItem>
                  <SelectItem value="fraud-detection">Fraud Detection</SelectItem>
                  <SelectItem value="recommendation-engine">Recommendation Engine</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            className="w-full mt-6 bg-primary hover:bg-primary/90"
            size="lg"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate ROI
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      3-Year ROI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{results.roiPercentage}%</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {formatCurrency(results.netROI)} net return
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      Payback Period
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{results.paybackMonths} mo</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Break-even timeline
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-purple-600" />
                      Efficiency Gain
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">{results.efficiencyGainPercent}%</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {formatNumber(results.hoursSaved)} hours/year saved
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Detailed Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Financial Breakdown</CardTitle>
                  <CardDescription>Detailed cost and savings analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Investment */}
                    <div>
                      <h3 className="font-semibold mb-3 text-red-600 dark:text-red-400">Total Investment</h3>
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Implementation Cost</span>
                          <span className="font-bold text-lg">{formatCurrency(results.totalCost)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Savings by Year */}
                    <div>
                      <h3 className="font-semibold mb-3 text-green-600 dark:text-green-400">Projected Savings</h3>
                      <div className="space-y-3">
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700 dark:text-gray-300">Year 1 Savings</span>
                            <span className="font-bold text-lg">{formatCurrency(results.yearOneSavings)}</span>
                          </div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700 dark:text-gray-300">Year 2 Savings</span>
                            <span className="font-bold text-lg">{formatCurrency(results.yearTwoSavings)}</span>
                          </div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700 dark:text-gray-300">Year 3 Savings</span>
                            <span className="font-bold text-lg">{formatCurrency(results.yearThreeSavings)}</span>
                          </div>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 border-2 border-green-300 dark:border-green-700">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-800 dark:text-gray-200">Total 3-Year Savings</span>
                            <span className="font-bold text-xl text-green-600">{formatCurrency(results.totalThreeYearSavings)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Net ROI */}
                    <div className="border-t pt-6">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border-2 border-blue-300 dark:border-blue-700">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-gray-800 dark:text-gray-200">Net Return (3 Years)</span>
                          <span className="text-3xl font-bold text-blue-600">{formatCurrency(results.netROI)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-3">Ready to Realize These Returns?</h3>
                  <p className="mb-6 text-blue-50">
                    Schedule a consultation to discuss how we can help you achieve these results with a customized AI solution.
                  </p>
                  <Button asChild size="lg" variant="secondary">
                    <a href="/contact">Schedule Free Consultation</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
