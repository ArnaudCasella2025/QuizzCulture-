import { useGame } from './hooks/useGame'
import SetupScreen from './components/SetupScreen'
import GameScreen from './components/GameScreen'
import EndScreen from './components/EndScreen'

export default function App() {
  const { state, startGame, answer, nextTurn, endGame, resetGame } = useGame()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {state.phase === 'setup' && <SetupScreen onStart={startGame} />}
      {state.phase === 'playing' && (
        <GameScreen state={state} onAnswer={answer} onNext={nextTurn} onEnd={endGame} />
      )}
      {state.phase === 'finished' && <EndScreen players={state.players} onReplay={resetGame} />}
    </div>
  )
}
