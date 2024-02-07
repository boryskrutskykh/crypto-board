export const calculateAveragePrice = (volume: number, amount: number): string => {
  return volume && amount ? (volume / amount).toFixed(2) : "0";
};

export const calculateTotalCost = (amount: number, currentPrice: number): number => {
  return amount * currentPrice;
};

export const calculateProfit = (totalCost: number, volume: number): number => {
  return totalCost - volume;
};

export const calculatePercentage = (profit: number, volume: number): number => {
  return volume !== 0 ? (profit * 100) / volume : 0;
};