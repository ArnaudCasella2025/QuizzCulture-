export interface Question {
  id: string
  question: string
  options: [string, string, string]
  correctIndex: 0 | 1 | 2
  explanation: string
}

export interface LevelData {
  level: number
  name: string
  description: string
  questions: Question[]
}

export interface Player {
  id: string
  name: string
  level: number
  streak: number
  hasCorrectAtLevel: boolean
  score: number
  answered: number
  askedQuestionIds: string[]
}

export type AnswerResult = 'correct' | 'wrong' | null

export interface GameState {
  players: Player[]
  currentPlayerIndex: number
  currentQuestion: Question | null
  phase: 'setup' | 'playing' | 'finished'
  lastResult: AnswerResult
  leveledUp: boolean
  leveledDown: boolean
}
