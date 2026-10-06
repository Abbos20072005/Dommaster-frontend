export type StockStatusType = 'in_stock' | 'low_stock' | 'out_of_stock';

/**
 * A product with this many units or fewer is "low stock".
 * The real thresholds are not decided yet (PM + ops, BLD-97) — change them here, nowhere else.
 */
export const LOW_STOCK_THRESHOLD = 10;

export const getStockStatus = (quantity: number): StockStatusType => {
  if (quantity <= 0) return 'out_of_stock';
  if (quantity <= LOW_STOCK_THRESHOLD) return 'low_stock';
  return 'in_stock';
};
