/**
 * Shared validation utilities for consistent validation across the application
 */

/**
 * Email validation regex pattern
 * Validates basic email format: local@domain.tld
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns true if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Normalizes an email address (lowercase and trimmed)
 * @param email - The email address to normalize
 * @returns The normalized email address
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Validates and normalizes an email address
 * @param email - The email address to validate and normalize
 * @returns The normalized email if valid, null if invalid
 */
export function validateAndNormalizeEmail(email: string): string | null {
  if (!isValidEmail(email)) {
    return null;
  }
  return normalizeEmail(email);
}
