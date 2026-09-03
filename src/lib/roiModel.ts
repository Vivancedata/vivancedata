/**
 * The ROI model behind the calculator.
 *
 * This is the arithmetic a prospect is quoted from, so it lives where it can
 * be read and tested on its own. It used to sit inside a 485-line "use client"
 * module, reachable only by rendering the calculator, filling four inputs and
 * clicking -- and structurally ineligible for the coverage list, which names
 * only src/lib.
 *
 * No React, no formatting: callers own presentation.
 */

export interface ROIInputs {
  annualRevenue: number;
  employeeCount: number;
  avgHourlyRate: number;
  inefficiencyHours: number;
  useCase: string;
}

export interface ROIResults {
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

export const useCaseMultipliers: Record<string, { cost: number; savings: number; efficiency: number }> = {
  "customer-service": { cost: 1.0, savings: 1.2, efficiency: 40 },
  "process-automation": { cost: 0.9, savings: 1.5, efficiency: 50 },
  "predictive-analytics": { cost: 1.2, savings: 1.3, efficiency: 35 },
  "content-generation": { cost: 0.8, savings: 1.1, efficiency: 45 },
  "fraud-detection": { cost: 1.3, savings: 1.6, efficiency: 30 },
  "recommendation-engine": { cost: 1.1, savings: 1.4, efficiency: 25 },
};

export const calculateROI = (inputs: ROIInputs): ROIResults => {
  const multiplier = useCaseMultipliers[inputs.useCase] || useCaseMultipliers["process-automation"];
  const baseImplementationCost = 50000 + (inputs.employeeCount * 500);
  const totalCost = baseImplementationCost * multiplier.cost;

  const annualLaborSavings = inputs.employeeCount * inputs.inefficiencyHours * 52 * inputs.avgHourlyRate;
  const efficiencyGainPercent = multiplier.efficiency;
  const actualSavings = (annualLaborSavings * efficiencyGainPercent) / 100;

  const yearOneSavings = actualSavings * multiplier.savings * 0.7;
  const yearTwoSavings = actualSavings * multiplier.savings * 1.0;
  const yearThreeSavings = actualSavings * multiplier.savings * 1.1;

  const totalThreeYearSavings = yearOneSavings + yearTwoSavings + yearThreeSavings;
  const netROI = totalThreeYearSavings - totalCost;
  const roiPercentage = ((netROI / totalCost) * 100);
  const monthlySavings = yearOneSavings / 12;
  const paybackMonths = monthlySavings > 0 ? Math.ceil(totalCost / monthlySavings) : 999;
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
