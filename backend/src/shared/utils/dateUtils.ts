/**
 * Checks if the given date is valid.
 *
 * @param {Date | string} date - The date to validate. Can be a Date object or a date string.
 * @returns {boolean} Returns true if the date is valid, otherwise false.
 *
 * @example
 * isValidDate("2025-05-11") // true
 * isValidDate("invalid-date") // false
 * isValidDate(new Date()) // true
 */
export function isValidDate(date: Date | string): boolean {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
}

/**
 * Formats a given date into a string in the format "dd/mm/yyyy".
 * Pads single-digit days and months with leading zeros.
 *
 * @param {Date | string} date - The date to format (Date object or ISO string).
 * @returns {string} Formatted date string in "dd/mm/yyyy" format.
 *
 * @example
 * formatDate(new Date('2024-01-05')) // "05/01/2024"
 * formatDate("2024-12-25") // "25/12/2024"
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = d.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Calculates the age based on a given birth date.
 *
 * @param {Date | string} birthDate - The birth date to calculate the age from.
 * @returns {number} The calculated age in full years.
 *
 * @example
 * calculateAge("2000-05-11") // 25 (as of 2025-05-11)
 * calculateAge(new Date("1990-01-01")) // 35 (as of 2025)
 */
export function calculateAge(birthDate: Date | string): number {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getUTCFullYear() - birth.getUTCFullYear();
  const month = today.getUTCMonth() - birth.getUTCMonth();

  if (month < 0 || (month === 0 && today.getUTCDate() < birth.getUTCDate()))
    age--;

  return age;
}

/**
 * Checks whether a given deadline date is still valid.
 *
 * @param {Date | string} expirationDate - The date to validate. Can be a Date
 * object or a date string.
 * @returns {boolean} Returns true if the date is today or in the future, otherwise false.
 *
 * @example
 * isFutureOrToday("2025-06-01") // true
 * isFutureOrToday("2023-12-31") // false
 * isFutureOrToday(new Date()) // true (if run today)
 */
export function isFutureOrToday(expirationDate: Date | string): boolean {
  const date = new Date(expirationDate);
  const today = new Date();

  const year = today.getUTCFullYear() - date.getUTCFullYear();
  const month = today.getUTCMonth() - date.getUTCMonth();
  const day = today.getUTCDate() - date.getUTCDate();

  if (year > 0 || (year === 0 && month > 0) || (month === 0 && day > 0))
    return false;

  return true;
}
