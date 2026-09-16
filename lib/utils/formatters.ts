export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatWeight(weight: string | number): string {
  if (typeof weight === 'number') return `${weight}g`;
  return String(weight);
}
