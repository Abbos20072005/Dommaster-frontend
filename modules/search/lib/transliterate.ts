/** Pairs first — they must win over the single letters ("sh" is ш, not с + х). */
const PAIRS: Record<string, string> = {
  shch: 'щ',
  sh: 'ш',
  ch: 'ч',
  zh: 'ж',
  kh: 'х',
  ts: 'ц',
  yu: 'ю',
  ya: 'я',
  ye: 'е',
  yo: 'ё',
  "o'": 'о',
  "g'": 'г',
  'o‘': 'о',
  'g‘': 'г',
  'o’': 'о',
  'g’': 'г'
};

const LETTERS: Record<string, string> = {
  a: 'а',
  b: 'б',
  c: 'ц',
  d: 'д',
  e: 'е',
  f: 'ф',
  g: 'г',
  h: 'х',
  i: 'и',
  j: 'ж',
  k: 'к',
  l: 'л',
  m: 'м',
  n: 'н',
  o: 'о',
  p: 'п',
  q: 'к',
  r: 'р',
  s: 'с',
  t: 'т',
  u: 'у',
  v: 'в',
  w: 'в',
  x: 'х',
  y: 'й',
  z: 'з'
};

const PAIR_LENGTHS = [4, 2];

/**
 * Uzbek writes "s" for the Russian "ц" in many borrowed words ("sement" = цемент, "sirkul" =
 * циркуль): an "s" before e, i or y is also read as "ц".
 */
const SOFT_S = /s(?=[eiy])/g;

/** A query written only with Latin letters (digits, spaces and punctuation allowed). */
export const isLatinQuery = (query: string) => /[a-z]/i.test(query) && !/[^\u0000-ɏ]/.test(query);

/**
 * Latin → Cyrillic ("sement" → "цемент", "gipsokarton" → "гипсокартон"). The catalog is named in
 * Russian, while Uzbek customers often type in Latin letters.
 */
export function transliterate(query: string): string {
  const text = query.toLowerCase();
  let result = '';

  for (let i = 0; i < text.length; ) {
    const pair = PAIR_LENGTHS.map((length) => text.slice(i, i + length)).find(
      (part) => part in PAIRS
    );
    if (pair) {
      result += PAIRS[pair];
      i += pair.length;
      continue;
    }

    const char = text[i];
    // "e" at the start of a word is "э" (elektr → электр), elsewhere "е"
    const startsWord = i === 0 || text[i - 1] === ' ';
    result += char === 'e' && startsWord ? 'э' : (LETTERS[char] ?? char);
    i += 1;
  }

  return result;
}

/** Cyrillic spellings to try, most likely first: plain, then with "s" before e/i/y read as "ц". */
export function transliterateVariants(query: string): string[] {
  const plain = transliterate(query);
  const soft = transliterate(query.toLowerCase().replace(SOFT_S, 'ts'));
  return soft === plain ? [plain] : [plain, soft];
}
