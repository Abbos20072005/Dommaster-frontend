/** What the assistant puts in an answer: a product, as the card shows it. */
export type AssistantProduct = Pick<
  Product,
  'discount_price' | 'id' | 'images' | 'name' | 'price' | 'quantity' | 'slug' | 'unit'
>;

/** The page of the site an answer about the terms rests on (delivery, payment, returns). */
export interface AssistantSource {
  title: string;
  href: string;
}

export interface AssistantMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  /** ISO time */
  time: string;
  /** the user's message that did not get an answer */
  failed?: boolean;
  /** a card number or an SMS code was found in the user's message and hidden */
  masked?: boolean;
  products?: AssistantProduct[];
  /** quick answers under the message */
  suggestions?: string[];
  source?: AssistantSource;
  /** the assistant cannot answer: the operator card is shown */
  handoff?: boolean;
  /** nothing matched the question: "ask differently", "open the catalog" and the operator link */
  notFound?: boolean;
  /** more products matched than the answer shows: a link to all of them in the catalog */
  hasMore?: boolean;
  /** the question this answer is for (the link to all products searches for it) */
  query?: string;
  /** the customer's mark of the answer (optional) */
  rating?: 'down' | 'up';
  /** why the customer marked the answer as bad (one of the reason chips) */
  reason?: string;
}

export interface AssistantReply {
  sessionId?: string;
  text: string;
  products: AssistantProduct[];
  suggestions: string[];
  source?: AssistantSource;
  handoff: boolean;
  notFound: boolean;
  hasMore: boolean;
}

/** Why a question got no answer: it decides which notice the panel shows. */
export type AssistantErrorKind = 'disabled' | 'generic' | 'limit' | 'offline';

export class AssistantError extends Error {
  kind: AssistantErrorKind;

  constructor(kind: AssistantErrorKind) {
    super(kind);
    this.kind = kind;
  }
}
