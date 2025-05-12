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

export function calculateAge(birthDate: Date | string): number {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = birth.getUTCFullYear() - today.getUTCFullYear();
  const month = birth.getUTCMonth() - today.getUTCMonth();

  if (month < 0 || (month === 0 && today.getUTCDate() < birth.getUTCDate()))
    age--;

  return age;
}
