interface CustomerCard {
  id: number;
  card_id?: string;
  pan: string;
  is_default: boolean;
}

interface CardBindInitResponse {
  url: string;
  payment_id: number;
  token: string;
  message: string;
}

type CustomerCardsResponse = ApiResponse<CustomerCard[]>;
type CustomerCardResponse = ApiResponse<CustomerCard>;
