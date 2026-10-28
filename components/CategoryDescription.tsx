import { hasText, sanitizeHtml } from '@/lib/sanitizeHtml';

import { ExpandableHtml } from './ExpandableHtml';

interface Props {
  /** `description` of the category, sub-category or item category (the language of the request) */
  html: string | null | undefined;
}

/**
 * The text of a category under its products. Rendered on the server, so it is in the HTML for the
 * crawler; an empty text draws nothing.
 */
export const CategoryDescription = ({ html }: Props) => {
  const clean = sanitizeHtml(html);

  if (!hasText(clean)) return null;

  return <ExpandableHtml html={clean} />;
};
