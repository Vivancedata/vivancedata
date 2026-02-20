import { describe, expect, it } from "vitest";
import { formatDate } from "../../src/lib/formatDate";

describe("formatDate", () => {
  it("formats an ISO date string in long US format", () => {
    expect(formatDate("2025-02-20")).toBe("February 20, 2025");
  });

  it("keeps calendar date stable regardless of runtime timezone", () => {
    expect(formatDate("2025-01-01")).toBe("January 1, 2025");
  });
});
