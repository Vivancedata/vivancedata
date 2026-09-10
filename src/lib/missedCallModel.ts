/**
 * What after-hours calls are costing, worked out from the caller's own numbers.
 *
 * This model deliberately has no coefficients. The ROI calculator next door
 * carries a table of multipliers -- efficiency 40%, savings 1.2x, and so on --
 * that came from nowhere anybody can point at, and a figure derived from an
 * invented constant is an invented figure however carefully it is labelled.
 *
 * Everything here is multiplication a contractor can check on the back of an
 * envelope: calls missed, times the share that would have booked, times what a
 * job is worth. If they disagree with the answer they can see exactly which of
 * their own three numbers to argue with, which is the point.
 *
 * The one honest complication is that nobody knows the booking share. So the
 * model returns a RANGE around the caller's estimate rather than a single
 * number pretending to precision, and the caller sets the estimate themselves.
 *
 * No React, no formatting: callers own presentation.
 */

export interface MissedCallInputs {
  /** Calls a week that go unanswered outside hours. */
  missedCallsPerWeek: number;
  /** What an average job is worth to this business, in whole currency units. */
  averageJobValue: number;
  /**
   * Of the callers who reach voicemail, the share the owner believes would
   * have booked had someone picked up. 0-100.
   */
  bookingSharePercent: number;
}

export interface MissedCallResults {
  /** Jobs a year, at the caller's own estimate. */
  jobsLostPerYear: number;
  /** Revenue a year, at the caller's own estimate. */
  revenueLostPerYear: number;
  /** The same figure at half and at one-and-a-half times the estimate. */
  revenueLostLow: number;
  revenueLostHigh: number;
  /** Revenue a month, for comparison against a monthly running cost. */
  revenueLostPerMonth: number;
}

const WEEKS_PER_YEAR = 52;

/**
 * The range is +/- 50% of the caller's own booking-share estimate, clamped to
 * 0-100%. It is not a confidence interval and does not pretend to be one: it
 * exists so the headline number is read as "somewhere around this" rather than
 * as a measurement, because the input it rests on is a guess by construction.
 */
const RANGE_FACTOR = 0.5;

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

function nonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function calculateMissedCallCost(inputs: MissedCallInputs): MissedCallResults {
  const calls = nonNegative(inputs.missedCallsPerWeek);
  const jobValue = nonNegative(inputs.averageJobValue);
  const share = clampPercent(inputs.bookingSharePercent) / 100;

  const callsPerYear = calls * WEEKS_PER_YEAR;
  const jobsLostPerYear = Math.round(callsPerYear * share);
  const revenueLostPerYear = Math.round(jobsLostPerYear * jobValue);

  const lowShare = clampPercent(inputs.bookingSharePercent * (1 - RANGE_FACTOR)) / 100;
  const highShare = clampPercent(inputs.bookingSharePercent * (1 + RANGE_FACTOR)) / 100;

  return {
    jobsLostPerYear,
    revenueLostPerYear,
    revenueLostLow: Math.round(callsPerYear * lowShare * jobValue),
    revenueLostHigh: Math.round(callsPerYear * highShare * jobValue),
    revenueLostPerMonth: Math.round(revenueLostPerYear / 12),
  };
}
