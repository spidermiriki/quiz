const KEY = "quizz_scores";
const MAX_ENTRIES = 50;

export function saveScore({ name, score, total, mode }) {
  const entries = getScores();
  entries.push({
    name,
    score,
    total,
    pct: Math.round((score / total) * 100),
    mode,
    date: new Date().toLocaleDateString("fr-FR"),
  });
  // Keep last MAX_ENTRIES, sorted by pct desc
  entries.sort((a, b) => b.pct - a.pct || b.score - a.score);
  localStorage.setItem(KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
}

export function getScores() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

export function clearScores() {
  localStorage.removeItem(KEY);
}
