/** Meta description uchun HTML'dan oddiy matn: teglarsiz, bo'shliqlari yig'ilgan, `max` belgigacha */
export const htmlToText = (html: string | null | undefined, max = 160) => {
  const text = (html ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
};

/**
 * The title and the description written for the page in the admin panel (`meta_title`,
 * `meta_description`). Empty ones are `null`: then the page keeps its own template. The title
 * is used as it is (it already holds the site name).
 */
export const metaOverride = (source: object | null | undefined) => {
  const { meta_title: title, meta_description: description } = (source ?? {}) as {
    meta_title?: string | null;
    meta_description?: string | null;
  };

  return {
    ...(title?.trim() ? { title: { absolute: title.trim() } } : {}),
    ...(description?.trim() ? { description: description.trim() } : {})
  };
};
