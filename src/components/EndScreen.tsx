import type { Player } from '../types'
import { getLevel } from '../data'

interface Props {
  players: Player[]
  onReplay: () => void
}

export default function EndScreen({ players, onReplay }: Props) {
  const ranked = [...players].sort((a, b) => b.score - a.score || b.level - a.level)

  return (
    <div className="min-h-full flex flex-col px-5 pt-10 pb-10 max-w-md mx-auto w-full">
      <div className="text-center mb-8">
        <div className="text-5xl mb-2">🏆</div>
        <h1 className="text-2xl font-black text-yellow-300">Partie terminée !</h1>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        {ranked.map((p, i) => (
          <div
            key={p.id}
            className={`rounded-2xl p-4 flex items-center gap-3 ${
              i === 0 ? 'bg-yellow-400/15 border border-yellow-400/50' : 'bg-slate-800/70'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center font-bold shrink-0">
              {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate">{p.name}</p>
              <p className="text-xs text-slate-400">
                Niveau {p.level} · {getLevel(p.level).name}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold">{p.score}</p>
              <p className="text-xs text-slate-400">/{p.answered}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onReplay}
        className="mt-8 w-full rounded-2xl bg-indigo-500 hover:bg-indigo-400 active:scale-[0.98] transition py-4 text-lg font-bold shadow-lg shadow-indigo-950/50"
      >
        Nouvelle partie
      </button>
    </div>
  )
}
