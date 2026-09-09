import { useCallback, useEffect, useState } from 'react'
import type { AnswerResult, GameState, Player, Question } from '../types'
import { getLevel, MAX_LEVEL } from '../data'

const STORAGE_KEY = 'quizzculture-state-v1'
const STREAK_TO_LEVEL_UP = 10
const MIN_LEVEL = 1

function shuffleOptions(question: Question): Question {
  const order = [0, 1, 2]
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  const options = order.map((i) => question.options[i]) as [string, string, string]
  const correctIndex = order.indexOf(question.correctIndex) as 0 | 1 | 2
  return { ...question, options, correctIndex }
}

function pickQuestion(player: Player) {
  const levelData = getLevel(player.level)
  const unseen = levelData.questions.filter((q) => !player.askedQuestionIds.includes(q.id))
  const pool = unseen.length > 0 ? unseen : levelData.questions
  const question = pool[Math.floor(Math.random() * pool.length)]
  return shuffleOptions(question)
}

function makePlayer(id: string, name: string, level: number): Player {
  return { id, name, level, streak: 0, hasCorrectAtLevel: false, score: 0, answered: 0, askedQuestionIds: [] }
}

interface AnswerOutcome {
  player: Player
  leveledUp: boolean
  leveledDown: boolean
}

function applyAnswer(player: Player, correct: boolean): AnswerOutcome {
  const answered = player.answered + 1

  if (correct) {
    const nextStreak = player.streak + 1
    if (nextStreak >= STREAK_TO_LEVEL_UP && player.level < MAX_LEVEL) {
      return {
        player: { ...player, level: player.level + 1, streak: 0, hasCorrectAtLevel: false, score: player.score + 1, answered },
        leveledUp: true,
        leveledDown: false,
      }
    }
    return {
      player: { ...player, streak: nextStreak, hasCorrectAtLevel: true, score: player.score + 1, answered },
      leveledUp: false,
      leveledDown: false,
    }
  }

  const nextStreak = player.streak - 1
  if (nextStreak < 0) {
    const canDemote = player.level > MIN_LEVEL && player.hasCorrectAtLevel
    if (canDemote) {
      return {
        player: { ...player, level: player.level - 1, streak: 0, hasCorrectAtLevel: false, answered },
        leveledUp: false,
        leveledDown: true,
      }
    }
    return {
      player: { ...player, streak: 0, answered },
      leveledUp: false,
      leveledDown: false,
    }
  }

  return {
    player: { ...player, streak: nextStreak, answered },
    leveledUp: false,
    leveledDown: false,
  }
}

const initialState: GameState = {
  players: [],
  currentPlayerIndex: 0,
  currentQuestion: null,
  phase: 'setup',
  lastResult: null,
  leveledUp: false,
  leveledDown: false,
}

export function useGame() {
  const [state, setState] = useState<GameState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as GameState
        if (parsed.phase === 'playing' && parsed.players.length > 0) {
          const current = parsed.players[parsed.currentPlayerIndex]
          return { ...parsed, currentQuestion: pickQuestion(current), lastResult: null, leveledUp: false, leveledDown: false }
        }
        if (parsed.phase === 'finished') {
          return { ...parsed, currentQuestion: null }
        }
      }
    } catch {
      // ignore corrupted storage
    }
    return initialState
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // storage unavailable, ignore
    }
  }, [state])

  const startGame = useCallback((setup: { name: string; level: number }[]) => {
    const players = setup.map((p, i) => makePlayer(`p${i}-${Date.now()}`, p.name.trim() || `Joueur ${i + 1}`, p.level))
    const first = players[0]
    setState({
      players,
      currentPlayerIndex: 0,
      currentQuestion: pickQuestion(first),
      phase: 'playing',
      lastResult: null,
      leveledUp: false,
      leveledDown: false,
    })
  }, [])

  const answer = useCallback((choiceIndex: number) => {
    setState((prev) => {
      if (!prev.currentQuestion || prev.phase !== 'playing') return prev
      const correct = choiceIndex === prev.currentQuestion.correctIndex
      let leveledUp = false
      let leveledDown = false
      const players = prev.players.map((p, i) => {
        if (i !== prev.currentPlayerIndex) return p
        const askedQuestionIds = [...p.askedQuestionIds, prev.currentQuestion!.id]
        const outcome = applyAnswer({ ...p, askedQuestionIds }, correct)
        leveledUp = outcome.leveledUp
        leveledDown = outcome.leveledDown
        return outcome.player
      })
      return {
        ...prev,
        players,
        lastResult: (correct ? 'correct' : 'wrong') as AnswerResult,
        leveledUp,
        leveledDown,
      }
    })
  }, [])

  const nextTurn = useCallback(() => {
    setState((prev) => {
      const nextIndex = (prev.currentPlayerIndex + 1) % prev.players.length
      const nextPlayer = prev.players[nextIndex]
      return {
        ...prev,
        currentPlayerIndex: nextIndex,
        currentQuestion: pickQuestion(nextPlayer),
        lastResult: null,
        leveledUp: false,
        leveledDown: false,
      }
    })
  }, [])

  const endGame = useCallback(() => {
    setState((prev) => ({ ...prev, phase: 'finished', currentQuestion: null }))
  }, [])

  const resetGame = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    setState(initialState)
  }, [])

  return { state, startGame, answer, nextTurn, endGame, resetGame }
}
