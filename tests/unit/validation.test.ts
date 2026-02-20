import { describe, expect, it } from "vitest";
import {
  isValidEmail,
  normalizeEmail,
  validateAndNormalizeEmail,
} from "../../src/lib/validation";

describe("email validation helpers", () => {
  it("accepts valid email addresses", () => {
    expect(isValidEmail("name@example.com")).toBe(true);
    expect(isValidEmail(" Name.Last+tag@sub.example.org ")).toBe(true);
  });

  it("rejects invalid email addresses", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("name@example")).toBe(false);
  });

  it("normalizes an email address", () => {
    expect(normalizeEmail("  USER@Example.COM ")).toBe("user@example.com");
  });

  it("validates and normalizes in one step", () => {
    expect(validateAndNormalizeEmail(" USER@Example.COM ")).toBe(
      "user@example.com"
    );
    expect(validateAndNormalizeEmail("bad-email")).toBeNull();
  });
});
