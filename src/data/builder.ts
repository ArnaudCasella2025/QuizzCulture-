import type { LevelData, Question } from '../types'

export type Row = [string, [string, string, string], 0 | 1 | 2, string]

export function buildLevel(
  level: number,
  name: string,
  description: string,
  rows: Row[],
): LevelData {
  const questions: Question[] = rows.map(([question, options, correctIndex, explanation], i) => ({
    id: `l${level}-${i}`,
    question,
    options,
    correctIndex,
    explanation,
  }))
  return { level, name, description, questions }
}
