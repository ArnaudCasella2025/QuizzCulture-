import { useState } from 'react'
import { allLevels } from '../data'

interface DraftPlayer {
  name: string
  level: number
}

interface Props {
  onStart: (players: DraftPlayer[]) => void
}

const MIN_PLAYERS = 1
const MAX_PLAYERS = 8

export default function SetupScreen({ onStart }: Props) {
  const [count, setCount] = useState(2)
  const [players, setPlayers] = useState<DraftPlayer[]>(
    Array.from({ length: 2 }, () => ({ name: '', level: 1 })),
  )

  function setCountAndResize(next: number) {
    const clamped = Math.min(Math.max(next, MIN_PLAYERS), MAX_PLAYERS)
    setCount(clamped)
    setPlayers((prev) => {
      const copy = [...prev]
      while (copy.length < clamped) copy.push({ name: '', level: 1 })
      copy.length = clamped
      return copy
    })
  }

  function updatePlayer(index: number, patch: Partial<DraftPlayer>) {
    setPlayers((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)))
  }

  function handleStart() {
    onStart(players)
  }

  return (
    <div className="min-h-full flex flex-col px-5 pt-8 pb-10 max-w-md mx-auto w-full">
      <header className="mb-6 text-center">
        <div className="text-4xl font-black tracking-tight text-yellow-300">QuizzCulture</div>
        <p className="text-slate-300 mt-2 text-sm">Le quiz de culture générale, pour toute la famille</p>
      </header>

      <section className="mb-6">
        <label className="block text-sm font-semibold text-slate-200 mb-2">Nombre de joueurs</label>
        <div className="flex items-center gap-4 bg-slate-800/70 rounded-2xl p-3">
          <button
            type="button"
            onClick={() => setCountAndResize(count - 1)}
            disabled={count <= MIN_PLAYERS}
            className="w-11 h-11 rounded-xl bg-slate-700 text-xl font-bold disabled:opacity-30 active:scale-95 transition"
            aria-label="Moins de joueurs"
          >
            −
          </button>
          <div className="flex-1 text-center text-2xl font-bold">{count}</div>
          <button
            type="button"
            onClick={() => setCountAndResize(count + 1)}
            disabled={count >= MAX_PLAYERS}
            className="w-11 h-11 rounded-xl bg-slate-700 text-xl font-bold disabled:opacity-30 active:scale-95 transition"
            aria-label="Plus de joueurs"
          >
            +
          </button>
        </div>
      </section>

      <section className="flex-1 flex flex-col gap-4">
        {players.map((p, i) => {
          const levelData = allLevels[p.level - 1]
          return (
            <div key={i} className="bg-slate-800/70 rounded-2xl p-4">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Joueur {i + 1}</label>
              <input
                type="text"
                value={p.name}
                onChange={(e) => updatePlayer(i, { name: e.target.value })}
                placeholder={`Nom du joueur ${i + 1}`}
                maxLength={20}
                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2.5 text-base outline-none focus:border-indigo-400 mb-3"
              />
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-400">Niveau de départ</span>
                <span className="text-sm font-bold text-yellow-300">
                  {p.level} · {levelData.name}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={allLevels.length}
                value={p.level}
                onChange={(e) => updatePlayer(i, { level: Number(e.target.value) })}
                className="w-full accent-indigo-400"
              />
              <p className="text-xs text-slate-400 mt-1">{levelData.description}</p>
            </div>
          )
        })}
      </section>

      <button
        type="button"
        onClick={handleStart}
        className="mt-6 w-full rounded-2xl bg-indigo-500 hover:bg-indigo-400 active:scale-[0.98] transition py-4 text-lg font-bold shadow-lg shadow-indigo-950/50"
      >
        Démarrer la partie
      </button>
      <p className="text-center text-xs text-slate-500 mt-4">
        10 bonnes réponses d'affilée font gagner un niveau (jusqu'au niveau {allLevels.length}).
      </p>
    </div>
  )
}
