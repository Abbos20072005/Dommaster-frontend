import { formatPrice } from '@/lib/utils';

/** The API gives money as strings with 2 decimals: shown in whole sums, "1 245 000". */
export const formatMoney = (value: string | number) => formatPrice(Math.round(Number(value)));
