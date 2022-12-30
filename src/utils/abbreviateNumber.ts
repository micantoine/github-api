/**
 * Abbreviate a number
 * @param n the number to abbreviate
 * @returns the abbreviated number
 */
export const abbreviateNumber = (n: number): string => {
  if (n < 1e3)
    return n.toString();

  if (n >= 1e3 && n < 1e6)
    return +(n / 1e3).toFixed(1) + 'K';

  if (n >= 1e6 && n < 1e9)
    return +(n / 1e6).toFixed(1) + 'M';

  if (n >= 1e9 && n < 1e12)
    return +(n / 1e9).toFixed(1) + 'B';
  
  return +(n / 1e12).toFixed(1) + 'T';
};
