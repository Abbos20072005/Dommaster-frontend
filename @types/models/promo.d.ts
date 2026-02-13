interface Promo {
  code: string;
  discount_precent: number;
  expires_at: string;
  id: number;
  name: string;
}

type PromosResponse = ApiResponse<Promo[]>;
type PromoResponse = ApiResponse<Promo>;

interface PromoCodeChecker {
  discount_precent: number;
  saved_price: number;
  total_price: number;
}

type PromoCodeCheckerResponse = ApiResponse<PromoCodeChecker>;
