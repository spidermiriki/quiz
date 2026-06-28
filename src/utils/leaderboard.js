const KEY = "quizz_scores";
const MAX_ENTRIES = 50;

export function saveScore({ name, score, total, points, mode }) {
  const entries = getScores();
  entries.push({
    name,
    score,
    total,
    points,
    mode,
    date: new Date().toLocaleDateString("fr-FR"),
  });
  entries.sort((a, b) => b.points - a.points || b.score - a.score);
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
