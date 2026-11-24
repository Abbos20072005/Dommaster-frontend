/** The pages a FAQ question can be tied to (`?page=` of `GET /faq/`). */
type FaqPageKey =
  | 'courier-delivery'
  | 'faq'
  | 'legal-entities'
  | 'payment-methods'
  | 'pickup'
  | 'pro'
  | 'returns';

interface FaqQuestion {
  /** limited HTML: a, b, strong, ul, ol, li, p, br — the server removed the rest */
  answer: string;
  id: number;
  page_keys: FaqPageKey[];
  /** plain text: show it escaped, not as HTML */
  question: string;
  updated_at: string;
}

interface FaqTopic {
  id: number;
  /** plain text, in the language of the request */
  name: string;
  questions: FaqQuestion[];
  /** a permanent key of the topic: `delivery`, `returns`, `pickup`… */
  slug: string;
}

type FaqResponse = ApiResponse<FaqTopic[]>;
