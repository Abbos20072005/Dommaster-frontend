/** Number of single-letter edits (insert, delete, change) between two words. */
export function levenshtein(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }

  return row[b.length];
}

/** The words (letters and digits, 3+ long) of some texts, lower case. */
export const extractWords = (texts: string[]): string[] =>
  texts.flatMap((text) => text.toLowerCase().match(/[\p{L}\p{N}]{3,}/gu) ?? []);

/** How many edits a word of this length may be off and still count as a typo. */
const allowedEdits = (word: string) => Math.max(1, Math.floor(word.length / 4));

/**
 * The most likely word the customer meant: the closest one among `words` (the catalog's own
 * words), nearest first and, among equals, the most frequent. null — nothing is close enough.
 * Catalog words are inflected ("цементная"), so a longer word is compared by its beginning and
 * suggested as that stem ("цемент"), which the search finds again.
 */
export function findClosestWord(word: string, words: string[]): string | null {
  const target = word.toLowerCase();
  const limit = allowedEdits(target);
  const counts = new Map<string, number>();
  for (const candidate of words) {
    for (let length = target.length - limit; length <= target.length + limit; length++) {
      if (length < 3 || length > candidate.length) continue;
      const stem = candidate.slice(0, length);
      counts.set(stem, (counts.get(stem) ?? 0) + 1);
    }
  }

  // the word is spelled right ("цемент" in "цементная"): the failure is elsewhere in the query
  if (counts.has(target)) return null;

  let best: { word: string; distance: number; count: number } | null = null;
  for (const [candidate, count] of counts) {
    const distance = levenshtein(target, candidate);
    if (distance > limit) continue;
    if (!best || distance < best.distance || (distance === best.distance && count > best.count)) {
      best = { word: candidate, distance, count };
    }
  }

  return best?.word ?? null;
}
