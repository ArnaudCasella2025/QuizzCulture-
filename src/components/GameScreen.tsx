import { useEffect, useRef, useState } from 'react'
import type { GameState } from '../types'
import { MAX_LEVEL, getLevel } from '../data'
import { isCorrectGuess } from '../utils/answerMatch'
import LevelUpModal from './LevelUpModal'
import ManagePlayersModal from './ManagePlayersModal'
import TurnTransition from './TurnTransition'

interface Props {
  state: GameState
  onAnswer: (choiceIndex: number, points?: number) => void
  onNext: () => void
  onAddPlayer: (name: string, level: number) => void
  onRemovePlayer: (playerId: string) => void
  onEnd: () => void
}

const STREAK_TARGET = 10
const GUESS_POINTS = 2
const CHOICE_POINTS = 1

export default function GameScreen({ state, onAnswer, onNext, onAddPlayer, onRemovePlayer, onEnd }: Props) {
  const [confirmEnd, setConfirmEnd] = useState(false)
  const [managingPlayers, setManagingPlayers] = useState(false)
  const [chosenIndex, setChosenIndex] = useState<number | null>(null)
  const [trackedQuestionId, setTrackedQuestionId] = useState<string | null>(null)
  const [levelUpDismissed, setLevelUpDismissed] = useState(false)
  const [guessPhase, setGuessPhase] = useState(true)
  const [guessText, setGuessText] = useState('')
  const [guessWasWrong, setGuessWasWrong] = useState(false)
  const [wonByGuess, setWonByGuess] = useState(false)
  const [showTurnTransition, setShowTurnTransition] = useState(false)
  const prevPlayerIdRef = useRef<string | null>(null)
  const player = state.players[state.currentPlayerIndex]
  const question = state.currentQuestion
  const answered = state.lastResult !== null

  if (question && question.id !== trackedQuestionId) {
    setTrackedQuestionId(question.id)
    setChosenIndex(null)
    setLevelUpDismissed(false)
    setGuessPhase(true)
    setGuessText('')
    setGuessWasWrong(false)
    setWonByGuess(false)
  }

  useEffect(() => {
    if (!player) return
    if (prevPlayerIdRef.current !== null && prevPlayerIdRef.current !== player.id) {
      setShowTurnTransition(true)
    }
    prevPlayerIdRef.current = player.id
  }, [player?.id])

  if (!player || !question) return null

  const showLevelUpModal = state.leveledUp && !levelUpDismissed

  function handleAnswer(i: number, points = CHOICE_POINTS) {
    setChosenIndex(i)
    onAnswer(i, points)
  }

  function handleGuessSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!guessText.trim() || !question) return
    if (isCorrectGuess(guessText, question.options[question.correctIndex])) {
      setWonByGuess(true)
      handleAnswer(question.correctIndex, GUESS_POINTS)
    } else {
      setGuessWasWrong(true)
      setGuessPhase(false)
    }
  }

  const levelData = getLevel(player.level)
  const optionLetters = ['A', 'B', 'C']

  return (
    <div className="min-h-full flex flex-col px-5 pt-6 pb-8 max-w-md mx-auto w-full">
      <header className="mb-4">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>
            Tour de <strong className="text-slate-200">{player.name}</strong>
          </span>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setManagingPlayers(true)} className="underline decoration-dotted">
              Joueurs
            </button>
            <button type="button" onClick={() => setConfirmEnd(true)} className="underline decoration-dotted">
              Terminer la partie
            </button>
          </div>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {state.players.map((p, i) => (
            <div
              key={p.id}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                i === state.currentPlayerIndex ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {p.name} · Nv.{p.level}
            </div>
          ))}
        </div>
      </header>

      <div className="bg-slate-800/70 rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-yellow-300">
            Niveau {player.level} · {levelData.name}
          </span>
          <span className="text-xs text-slate-400">
            Score : {player.score}/{player.answered}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: STREAK_TARGET }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${i < player.streak ? 'bg-emerald-400' : 'bg-slate-700'}`}
            />
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5">
          {player.level >= MAX_LEVEL
            ? 'Niveau maximum atteint !'
            : `${player.streak}/${STREAK_TARGET} bonnes réponses d'affilée pour monter de niveau`}
        </p>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5 mb-5 flex-1 flex items-center">
          <p className="text-xl font-bold leading-snug">{question.question}</p>
        </div>

        {guessPhase && !answered && (
          <form onSubmit={handleGuessSubmit} className="flex flex-col gap-3 mb-3">
            <p className="text-xs text-slate-400">
              Réponds sans les choix pour gagner {GUESS_POINTS} points au lieu de {CHOICE_POINTS} !
            </p>
            <input
              type="text"
              inputMode="text"
              autoFocus
              value={guessText}
              onChange={(e) => setGuessText(e.target.value)}
              placeholder="Ta réponse..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3.5 text-base font-medium outline-none focus:border-indigo-400"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setGuessPhase(false)}
                className="flex-1 rounded-xl bg-slate-700 py-3 font-semibold active:scale-[0.98] transition"
              >
                Je ne sais pas
              </button>
              <button
                type="submit"
                disabled={!guessText.trim()}
                className="flex-1 rounded-xl bg-indigo-500 hover:bg-indigo-400 py-3 font-bold active:scale-[0.98] transition disabled:opacity-30"
              >
                Valider
              </button>
            </div>
          </form>
        )}

        {(!guessPhase || answered) && (
        <>
        {guessWasWrong && !answered && (
          <p className="text-xs text-slate-400 mb-2">Pas trouvé ? Choisis parmi les propositions :</p>
        )}
        <div className="flex flex-col gap-3">
          {question.options.map((opt, i) => {
            const isCorrect = i === question.correctIndex
            const isWrongChoice = answered && chosenIndex === i && !isCorrect
            let style = 'bg-slate-800 border-slate-700 active:scale-[0.98]'
            if (answered) {
              if (isCorrect) style = 'bg-emerald-600/90 border-emerald-400'
              else if (isWrongChoice) style = 'bg-rose-600/80 border-rose-400'
              else style = 'bg-slate-800 border-slate-700 opacity-50'
            }
            return (
              <button
                key={i}
                type="button"
                disabled={answered}
                onClick={() => handleAnswer(i)}
                className={`w-full text-left rounded-2xl border px-4 py-3.5 transition flex items-center gap-3 ${style}`}
              >
                <span className="w-7 h-7 shrink-0 rounded-full bg-black/20 flex items-center justify-center text-xs font-bold">
                  {optionLetters[i]}
                </span>
                <span className="text-base font-medium">{opt}</span>
                {answered && isCorrect && <span className="ml-auto text-lg">✓</span>}
                {isWrongChoice && <span className="ml-auto text-lg">✗</span>}
              </button>
            )
          })}
        </div>

        {answered && (
          <div
            className={`mt-5 rounded-2xl p-4 ${
              state.lastResult === 'correct' ? 'bg-emerald-950/60 border border-emerald-700' : 'bg-rose-950/60 border border-rose-700'
            }`}
          >
            <p className="font-bold mb-1">
              {state.lastResult === 'correct'
                ? wonByGuess
                  ? `✅ Trouvé sans les choix ! +${GUESS_POINTS} points`
                  : '✅ Bonne réponse !'
                : '❌ Mauvaise réponse'}
              {state.leveledUp && <span className="text-yellow-300"> · Niveau supérieur débloqué 🎉</span>}
              {state.leveledDown && <span className="text-orange-300"> · Niveau inférieur ⬇️</span>}
            </p>
            <p className="text-sm text-slate-300">{question.explanation}</p>
            <button
              type="button"
              onClick={onNext}
              className="mt-4 w-full rounded-xl bg-indigo-500 hover:bg-indigo-400 active:scale-[0.98] transition py-3 font-bold"
            >
              Joueur suivant →
            </button>
          </div>
        )}
        </>
        )}
      </div>

      {showTurnTransition && (
        <TurnTransition
          playerName={player.name}
          level={player.level}
          levelName={levelData.name}
          onDone={() => setShowTurnTransition(false)}
        />
      )}

      {showLevelUpModal && (
        <LevelUpModal
          playerName={player.name}
          level={player.level}
          levelName={levelData.name}
          onClose={() => setLevelUpDismissed(true)}
        />
      )}

      {managingPlayers && (
        <ManagePlayersModal
          players={state.players}
          currentPlayerIndex={state.currentPlayerIndex}
          onAdd={onAddPlayer}
          onRemove={onRemovePlayer}
          onClose={() => setManagingPlayers(false)}
        />
      )}

      {confirmEnd && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-6 z-10">
          <div className="bg-slate-800 rounded-2xl p-5 max-w-sm w-full">
            <p className="font-bold mb-1">Terminer la partie ?</p>
            <p className="text-sm text-slate-300 mb-4">Le classement final sera affiché.</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmEnd(false)}
                className="flex-1 rounded-xl bg-slate-700 py-2.5 font-semibold"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={onEnd}
                className="flex-1 rounded-xl bg-rose-600 py-2.5 font-semibold"
              >
                Terminer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
