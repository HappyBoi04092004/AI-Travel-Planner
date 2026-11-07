/**
 * Deterministic date formatting utility for Vietnamese UI.
 * Avoids React hydration mismatch across Node.js SSR and client browsers.
 */

export function formatVietnameseDate(dateStr?: string | null): string {
  if (!dateStr) return '';
  try {
    const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
    const parts = cleanDate.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${parseInt(day, 10).toString().padStart(2, '0')}/${parseInt(month, 10).toString().padStart(2, '0')}/${year}`;
    }
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return dateStr || '';
  }
}

