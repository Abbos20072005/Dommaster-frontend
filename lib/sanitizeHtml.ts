/** Tags of a category text written in the admin editor; everything else is dropped (its text stays). */
const ALLOWED = new Set(['p', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'br']);

/** Tags that come out as another allowed one: a page has one H1 (its title), small headings are H3. */
const RENAMED: Record<string, string> = {
  h1: 'h2',
  h4: 'h3',
  h5: 'h3',
  h6: 'h3',
  b: 'strong',
  i: 'em'
};

/** Tags whose whole content is dropped, not only the tag. */
const DROP_WITH_CONTENT = /<(script|style|iframe|object|embed|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;

const SAFE_HREF = /^(https?:\/\/|\/(?!\/)|mailto:|tel:)/i;

const hrefOf = (attributes: string) => {
  const match = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/i.exec(attributes);
  const href = (match?.[1] ?? match?.[2] ?? '').trim();

  return SAFE_HREF.test(href) ? href.replace(/"/g, '&quot;') : null;
};

/**
 * The HTML of a text from the admin panel, reduced to `p, h2, h3, ul, ol, li, a, strong, em, br`.
 * `style`, `class` and every other attribute are removed (a text pasted from another page brings
 * them); a link keeps only a safe `href`. Every tag is rebuilt from the list, so nothing else gets
 * through; a stray `<` that is not a tag is escaped.
 */
export const sanitizeHtml = (html: string | null | undefined): string => {
  const source = (html ?? '').replace(/<!--[\s\S]*?-->/g, '').replace(DROP_WITH_CONTENT, '');

  return source
    .replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (_, closing: string, rawName: string, attrs: string) => {
      const lower = rawName.toLowerCase();
      const name = RENAMED[lower] ?? lower;

      if (!ALLOWED.has(name)) return '';
      if (closing) return name === 'br' ? '' : `</${name}>`;
      if (name === 'br') return '<br>';
      if (name === 'a') {
        const href = hrefOf(attrs);

        return href ? `<a href="${href}" rel="noopener">` : '<a>';
      }

      return `<${name}>`;
    })
    .replace(/<(?![a-z/])/gi, '&lt;')
    .trim();
};

/** The text without tags: tells an empty text (`<p></p>`, only spaces) from a real one. */
export const hasText = (html: string) =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim().length > 0;
