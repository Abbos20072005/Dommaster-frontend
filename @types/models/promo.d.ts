interface Promo {
  code: string;
  discount: number;
  end_date: string;
  id: number;
  name: string;
  start_date: string;
}

type PromosResponse = ApiResponse<Promo[]>;
type PromoResponse = ApiResponse<Promo>;

interface PromoCodeChecker {
  discount_precent: number;
  saved_price: number;
  total_price: number;
}

type PromoCodeCheckerResponse = ApiResponse<PromoCodeChecker>;
