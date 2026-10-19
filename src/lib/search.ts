import { Book } from '../types';

/**
 * Maps common Cyrillic Uzbek/Russian characters to Latin equivalents
 * so searching in Cyrillic (e.g. "Алишер Навоий", "Қодирий", "Ўткан кунлар")
 * seamlessly matches Latin titles!
 */
const CYRILLIC_TO_LATIN_MAP: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
  'ж': 'j', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
  'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
  'ф': 'f', 'х': 'x', 'ҳ': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh',
  'ъ': "'", 'ы': 'i', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
  'ў': "o'", 'ғ': "g'", 'қ': 'q',
};

/**
 * Comprehensive normalizer for Uzbek and multilingual search text:
 * 1. Lowercases the string
 * 2. Transliterates Cyrillic characters to Latin
 * 3. Normalizes all variations of apostrophes (‘, ’, ʻ, ʼ, `, ´) to standard ASCII '
 * 4. Trims leading/trailing spaces and collapses inner spaces
 */
export function normalizeSearchString(rawText: string | undefined | null): string {
  if (!rawText) return '';

  let text = String(rawText).toLowerCase().trim();

  // Convert Cyrillic to Latin if any
  let transliterated = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    transliterated += CYRILLIC_TO_LATIN_MAP[ch] !== undefined ? CYRILLIC_TO_LATIN_MAP[ch] : ch;
  }
  text = transliterated;

  // Unify all apostrophe / quotation variations:
  // U+2018 (‘), U+2019 (’), U+02BB (ʻ), U+02BC (ʼ), U+0060 (`), U+00B4 (´), U+201B (‛)
  text = text.replace(/[\u2018\u2019\u201A\u201B\u02BB\u02BC\u0060\u00B4\u2032\u2035]/g, "'");

  // Remove punctuation that commonly wraps titles like « », " ", etc.
  text = text.replace(/[«»""„]/g, '');

  // Collapse consecutive whitespaces
  text = text.replace(/\s+/g, ' ');

  return text;
}

/**
 * Returns string with all apostrophes removed to allow matching "otkan" with "o'tkan"
 */
export function stripApostrophes(normalizedText: string): string {
  return normalizedText.replace(/['\-]/g, '');
}

/**
 * Checks if a book matches a search query across:
 * - Title
 * - Author
 * - Genre
 * - Description
 * - Chapter titles (if available)
 */
export function bookMatchesQuery(book: Book, rawQuery: string): boolean {
  const normQuery = normalizeSearchString(rawQuery);
  if (!normQuery) return true; // empty query matches all

  const strippedQuery = stripApostrophes(normQuery);

  // Combine all searchable text fields of the book
  const chapterTitles = book.chapters ? book.chapters.map(c => c.title).join(' ') : '';
  const combinedRaw = `${book.title} ${book.author} ${book.genre} ${book.description} ${chapterTitles}`;

  const normTarget = normalizeSearchString(combinedRaw);
  const strippedTarget = stripApostrophes(normTarget);

  // 1. Direct substring match on normalized text
  if (normTarget.includes(normQuery)) {
    return true;
  }

  // 2. Substring match on stripped text (handles "otkan" -> "o'tkan", "ozbegim" -> "o'zbegim")
  if (strippedTarget.includes(strippedQuery)) {
    return true;
  }

  // 3. Multi-word search token matching (e.g., "Alisher Navoiy", "Qodiriy Otabek", "Jahon roman")
  const queryTokens = strippedQuery.split(' ').filter(Boolean);
  if (queryTokens.length > 1) {
    const allTokensMatch = queryTokens.every(token => strippedTarget.includes(token));
    if (allTokensMatch) return true;
  }

  // 4. Token-by-token check on the individual fields
  const titleNorm = stripApostrophes(normalizeSearchString(book.title));
  const authorNorm = stripApostrophes(normalizeSearchString(book.author));
  const genreNorm = stripApostrophes(normalizeSearchString(book.genre));
  const descNorm = stripApostrophes(normalizeSearchString(book.description));

  if (
    titleNorm.includes(strippedQuery) ||
    authorNorm.includes(strippedQuery) ||
    genreNorm.includes(strippedQuery) ||
    descNorm.includes(strippedQuery)
  ) {
    return true;
  }

  return false;
}

/**
 * Filter books list by search query with relevance sorting:
 * 1. Title exact/starts-with matches first
 * 2. Author matches second
 * 3. Genre matches third
 * 4. Description matches fourth
 */
export function filterBooksBySearch(books: Book[], rawQuery: string): Book[] {
  if (!rawQuery || !rawQuery.trim()) {
    return books;
  }

  const normQuery = normalizeSearchString(rawQuery);
  const strippedQuery = stripApostrophes(normQuery);

  const matched = books.filter(book => bookMatchesQuery(book, rawQuery));

  // Sort by relevance
  return matched.sort((a, b) => {
    const aTitle = stripApostrophes(normalizeSearchString(a.title));
    const bTitle = stripApostrophes(normalizeSearchString(b.title));
    const aAuthor = stripApostrophes(normalizeSearchString(a.author));
    const bAuthor = stripApostrophes(normalizeSearchString(b.author));

    const aTitleExact = aTitle === strippedQuery;
    const bTitleExact = bTitle === strippedQuery;
    if (aTitleExact && !bTitleExact) return -1;
    if (!aTitleExact && bTitleExact) return 1;

    const aTitleStarts = aTitle.startsWith(strippedQuery);
    const bTitleStarts = bTitle.startsWith(strippedQuery);
    if (aTitleStarts && !bTitleStarts) return -1;
    if (!aTitleStarts && bTitleStarts) return 1;

    const aAuthorStarts = aAuthor.startsWith(strippedQuery);
    const bAuthorStarts = bAuthor.startsWith(strippedQuery);
    if (aAuthorStarts && !bAuthorStarts) return -1;
    if (!aAuthorStarts && bAuthorStarts) return 1;

    return 0;
  });
}
