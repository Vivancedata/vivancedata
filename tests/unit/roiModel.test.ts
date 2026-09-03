import { describe, expect, it } from "vitest";
import { calculateROI, useCaseMultipliers, type ROIInputs } from "../../src/lib/roiModel";

const baseInputs: ROIInputs = {
  annualRevenue: 5_000_000,
  employeeCount: 50,
  avgHourlyRate: 45,
  inefficiencyHours: 6,
  useCase: "process-automation",
};

describe("calculateROI", () => {
  it("pins the figures a prospect is quoted", () => {
    // A wrong constant here changes a number shown to a prospective client and
    // nothing else would notice, so the whole result is pinned rather than
    // spot-checked.
    expect(calculateROI(baseInputs)).toEqual({
      totalCost: 67_500,
      yearOneSavings: 368_550,
      yearTwoSavings: 526_500,
      yearThreeSavings: 579_150,
      totalThreeYearSavings: 1_474_200,
      netROI: 1_406_700,
      roiPercentage: 2_084,
      paybackMonths: 3,
      efficiencyGainPercent: 50,
      hoursSaved: 7_800,
    });
  });

  it("ramps savings across the three years", () => {
    const result = calculateROI(baseInputs);

    // The curve is deliberately 0.7 / 1.0 / 1.1 -- year one is discounted for
    // ramp-up, year three carries compounding.
    expect(result.yearOneSavings).toBeLessThan(result.yearTwoSavings);
    expect(result.yearTwoSavings).toBeLessThan(result.yearThreeSavings);
    expect(result.totalThreeYearSavings).toBe(
      result.yearOneSavings + result.yearTwoSavings + result.yearThreeSavings
    );
  });

  it("falls back to process-automation for an unknown use case", () => {
    expect(calculateROI({ ...baseInputs, useCase: "not-a-use-case" })).toEqual(
      calculateROI({ ...baseInputs, useCase: "process-automation" })
    );
  });

  it("reports an unreachable payback rather than dividing by zero", () => {
    const result = calculateROI({
      annualRevenue: 0,
      employeeCount: 0,
      avgHourlyRate: 0,
      inefficiencyHours: 0,
      useCase: "process-automation",
    });

    expect(result.yearOneSavings).toBe(0);
    expect(result.paybackMonths).toBe(999);
    expect(result.netROI).toBe(-45_000);
  });

  it("scales implementation cost with headcount", () => {
    const small = calculateROI({ ...baseInputs, employeeCount: 10 });
    const large = calculateROI({ ...baseInputs, employeeCount: 500 });

    expect(large.totalCost).toBeGreaterThan(small.totalCost);
    expect(large.hoursSaved).toBeGreaterThan(small.hoursSaved);
  });

  it("prices each use case distinctly", () => {
    const slugs = Object.keys(useCaseMultipliers);
    const costs = slugs.map((useCase) => calculateROI({ ...baseInputs, useCase }).totalCost);

    expect(slugs).toHaveLength(6);
    expect(new Set(costs).size).toBeGreaterThan(1);
  });
});
