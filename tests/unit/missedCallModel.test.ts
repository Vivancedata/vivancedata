import { describe, expect, it } from "vitest";
import { calculateMissedCallCost } from "@/lib/missedCallModel";

// This is the arithmetic a contractor is asked to trust, so the tests state the
// sums in full rather than asserting against the implementation's own output.

describe("calculateMissedCallCost", () => {
  it("multiplies the caller's own three numbers and nothing else", () => {
    // 6 calls a week x 52 = 312 a year. A third of them book = 104 jobs.
    // 104 jobs x $450 = $46,800.
    const r = calculateMissedCallCost({
      missedCallsPerWeek: 6,
      averageJobValue: 450,
      bookingSharePercent: 33.3333,
    });

    expect(r.jobsLostPerYear).toBe(104);
    expect(r.revenueLostPerYear).toBe(46800);
  });

  it("returns a range around the estimate, because the share is a guess", () => {
    const r = calculateMissedCallCost({
      missedCallsPerWeek: 10,
      averageJobValue: 100,
      bookingSharePercent: 40,
    });

    // 520 calls a year. 20% / 40% / 60% of them.
    expect(r.revenueLostLow).toBe(10400);
    expect(r.revenueLostPerYear).toBe(20800);
    expect(r.revenueLostHigh).toBe(31200);
    expect(r.revenueLostLow).toBeLessThan(r.revenueLostPerYear);
    expect(r.revenueLostHigh).toBeGreaterThan(r.revenueLostPerYear);
  });

  it("clamps the high end of the range at every call booking", () => {
    // 80% + 50% would be 120%, which would claim more jobs than there were calls.
    const r = calculateMissedCallCost({
      missedCallsPerWeek: 1,
      averageJobValue: 1000,
      bookingSharePercent: 80,
    });

    expect(r.revenueLostHigh).toBe(52 * 1000);
  });

  it("gives a monthly figure to set against a monthly running cost", () => {
    const r = calculateMissedCallCost({
      missedCallsPerWeek: 12,
      averageJobValue: 500,
      bookingSharePercent: 50,
    });

    expect(r.revenueLostPerMonth).toBe(Math.round(r.revenueLostPerYear / 12));
  });

  it("returns zero rather than NaN for empty, negative or absurd input", () => {
    for (const inputs of [
      { missedCallsPerWeek: 0, averageJobValue: 0, bookingSharePercent: 0 },
      { missedCallsPerWeek: -5, averageJobValue: -100, bookingSharePercent: -20 },
      { missedCallsPerWeek: Number.NaN, averageJobValue: Number.NaN, bookingSharePercent: Number.NaN },
    ]) {
      const r = calculateMissedCallCost(inputs);
      expect(r.jobsLostPerYear).toBe(0);
      expect(r.revenueLostPerYear).toBe(0);
      expect(r.revenueLostLow).toBe(0);
      expect(r.revenueLostHigh).toBe(0);
      expect(r.revenueLostPerMonth).toBe(0);
    }
  });

  it("treats a share above 100 as every call booking, not as more", () => {
    const r = calculateMissedCallCost({
      missedCallsPerWeek: 2,
      averageJobValue: 250,
      bookingSharePercent: 400,
    });

    expect(r.jobsLostPerYear).toBe(104);
    expect(r.revenueLostPerYear).toBe(26000);
  });
});
