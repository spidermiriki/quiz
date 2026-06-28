/**
 * Normalize a string for loose answer comparison:
 * - lowercase
 * - remove accents
 * - remove punctuation
 * - collapse whitespace
 */
export function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")   // remove accent marks
    .replace(/[^a-z0-9\s]/g, " ")      // replace non-alphanumeric with space
    .replace(/\s+/g, " ")              // collapse multiple spaces
    .trim();
}

export function isAnswerValid(input, acceptedAnswers) {
  const normalized = normalize(input);
  return acceptedAnswers.some((a) => normalize(a) === normalized);
}
