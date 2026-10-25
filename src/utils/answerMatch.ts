function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/^(le |la |les |l'|l’|un |une |des |du |de la |de l'|de l’)/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function levenshtein(a: string, b: string): number {
  const rows = a.length + 1
  const cols = b.length + 1
  const dist = Array.from({ length: rows }, (_, i) => [i, ...Array(cols - 1).fill(0)])
  for (let j = 1; j < cols; j++) dist[0][j] = j
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dist[i][j] = Math.min(dist[i - 1][j] + 1, dist[i][j - 1] + 1, dist[i - 1][j - 1] + cost)
    }
  }
  return dist[rows - 1][cols - 1]
}

export function isCorrectGuess(guess: string, correctOption: string): boolean {
  const g = normalize(guess)
  const t = normalize(correctOption)
  if (!g) return false
  if (g === t) return true
  const maxDist = t.length <= 4 ? 0 : t.length <= 8 ? 1 : 2
  return levenshtein(g, t) <= maxDist
}
