/** A block of a trust page (delivery, payment, returns, contacts, offer, privacy policy). */
export type TrustBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id?: string }
  | { type: 'list'; items: string[] }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'table'; head?: string[]; rows: string[][] }
  /** key — value rows; `href` makes the value a link (a phone is `tel:`) */
  | { type: 'kv'; rows: { key: string; value: string; href?: string }[] }
  | { type: 'faq'; items: { q: string; a: string }[] }
  | { type: 'links'; label: string; items: { text: string; href: string }[] }
  /** a small grey line: the edition and the date of a legal text */
  | { type: 'meta'; text: string }
  /** a block that calls to act (a service page): buttons; event is sent to the analytics on a click */
  | {
      type: 'cta';
      title: string;
      text?: string;
      buttons: { text: string; href: string; event?: string; variant?: 'primary' | 'outline' }[];
    };

export interface TrustPageContent {
  /** `<title>` without the site suffix */
  title: string;
  description: string;
  h1: string;
  blocks: TrustBlock[];
  /** not offered to the search engines (a page whose texts are not approved yet) */
  noindex?: boolean;
}

/** The texts of one page in every language of the site. */
export type TrustPageSet = Record<'uz' | 'ru', TrustPageContent>;
