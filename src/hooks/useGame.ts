import { useCallback, useEffect, useState } from 'react'
import type { AnswerResult, GameState, Player } from '../types'
import { getLevel, MAX_LEVEL } from '../data'

const STORAGE_KEY = 'quizzculture-state-v1'
const STREAK_TO_LEVEL_UP = 10

function pickQuestion(player: Player) {
  const levelData = getLevel(player.level)
  const unseen = levelData.questions.filter((q) => !player.askedQuestionIds.includes(q.id))
  const pool = unseen.length > 0 ? unseen : levelData.questions
  return pool[Math.floor(Math.random() * pool.length)]
}

function makePlayer(id: string, name: string, level: number): Player {
  return { id, name, level, streak: 0, score: 0, answered: 0, askedQuestionIds: [] }
}

const initialState: GameState = {
  players: [],
  currentPlayerIndex: 0,
  currentQuestion: null,
  phase: 'setup',
  lastResult: null,
  leveledUp: false,
}

export function useGame() {
  const [state, setState] = useState<GameState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as GameState
        if (parsed.phase === 'playing' && parsed.players.length > 0) {
          const current = parsed.players[parsed.currentPlayerIndex]
          return { ...parsed, currentQuestion: pickQuestion(current), lastResult: null, leveledUp: false }
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
    })
  }, [])

  const answer = useCallback((choiceIndex: number) => {
    setState((prev) => {
      if (!prev.currentQuestion || prev.phase !== 'playing') return prev
      const correct = choiceIndex === prev.currentQuestion.correctIndex
      const players = prev.players.map((p, i) => {
        if (i !== prev.currentPlayerIndex) return p
        const askedQuestionIds = [...p.askedQuestionIds, prev.currentQuestion!.id]
        const streak = correct ? p.streak + 1 : 0
        const willLevelUp = correct && streak >= STREAK_TO_LEVEL_UP && p.level < MAX_LEVEL
        return {
          ...p,
          score: correct ? p.score + 1 : p.score,
          answered: p.answered + 1,
          askedQuestionIds,
          streak: willLevelUp ? 0 : streak,
          level: willLevelUp ? p.level + 1 : p.level,
        }
      })
      const leveledUp = correct && players[prev.currentPlayerIndex].level > prev.players[prev.currentPlayerIndex].level
      return {
        ...prev,
        players,
        lastResult: (correct ? 'correct' : 'wrong') as AnswerResult,
        leveledUp,
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
