export const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
] as const

export function formatMonth(month: string): string {
  return month.charAt(0).toUpperCase() + month.slice(1)
}
