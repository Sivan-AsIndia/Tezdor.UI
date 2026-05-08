// ── Number-to-Words (Indian System) ──────────────────────────
// Converts a number to its Indian currency words representation.
// Example: 206264 → "Two Lakh Six Thousand Two Hundred Sixty-Four Only"

const ones = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
  'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen',
  'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
];

const tens = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
  'Sixty', 'Seventy', 'Eighty', 'Ninety',
];

function twoDigitWords(n: number): string {
  if (n < 20) return ones[n];
  const t = tens[Math.floor(n / 10)];
  const o = ones[n % 10];
  return o ? `${t}-${o}` : t;
}

function threeDigitWords(n: number): string {
  if (n === 0) return '';
  if (n < 100) return twoDigitWords(n);
  const h = ones[Math.floor(n / 100)];
  const rest = n % 100;
  return rest ? `${h} Hundred ${twoDigitWords(rest)}` : `${h} Hundred`;
}

/**
 * Converts an amount in INR to words using the Indian numbering system
 * (Crore → Lakh → Thousand → Hundred).
 *
 * @param amount - The numeric amount to convert.
 * @returns A string like "INR Two Lakh Six Thousand Two Hundred Sixty-Four Only"
 */
export function amountToWords(amount: number): string {
  if (amount === 0) return 'INR Zero Only';

  const intPart = Math.floor(Math.abs(amount));
  const parts: string[] = [];

  // Crore (10,000,000)
  const crore = Math.floor(intPart / 10000000);
  if (crore > 0) parts.push(`${threeDigitWords(crore)} Crore`);

  // Lakh (100,000)
  const lakh = Math.floor((intPart % 10000000) / 100000);
  if (lakh > 0) parts.push(`${twoDigitWords(lakh)} Lakh`);

  // Thousand (1,000)
  const thousand = Math.floor((intPart % 100000) / 1000);
  if (thousand > 0) parts.push(`${twoDigitWords(thousand)} Thousand`);

  // Hundred + remainder
  const remainder = intPart % 1000;
  if (remainder > 0) parts.push(threeDigitWords(remainder));

  return `INR ${parts.join(' ')} Only`;
}

/**
 * Formats a number in Indian locale with 3-decimal precision.
 * Example: 42640 → "42,640.000"
 */
export function formatIndianNumber(n: number, decimals = 3): string {
  return n.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formats a date string to "dd-MMM-yyyy" (e.g., "03-Apr-2026").
 */
export function formatPrintDate(dateStr: string | undefined): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const day = String(d.getDate()).padStart(2, '0');
  const mon = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day}-${mon}-${year}`;
}
