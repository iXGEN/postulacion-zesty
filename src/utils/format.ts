export const formatCurrencyUSD = (amount: number) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount);

export const formatPercentage = (percentageValue: number) =>
  new Intl.NumberFormat('es-CL', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(percentageValue / 100);
