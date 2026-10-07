/** Meta description uchun HTML'dan oddiy matn: teglarsiz, bo'shliqlari yig'ilgan, `max` belgigacha */
export const htmlToText = (html: string | null | undefined, max = 160) => {
  const text = (html ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
};
