import { useState } from 'react'
import type { Player } from '../types'
import { allLevels } from '../data'

interface Props {
  players: Player[]
  currentPlayerIndex: number
  onAdd: (name: string, level: number) => void
  onRemove: (playerId: string) => void
  onClose: () => void
}

export default function ManagePlayersModal({ players, currentPlayerIndex, onAdd, onRemove, onClose }: Props) {
  const [name, setName] = useState('')
  const [level, setLevel] = useState(1)
  const levelData = allLevels[level - 1]

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    onAdd(name, level)
    setName('')
    setLevel(1)
  }

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 px-5"
      role="dialog"
      aria-modal="true"
      aria-label="Gérer les joueurs"
    >
      <div className="bg-slate-800 rounded-2xl p-5 max-w-sm w-full max-h-[85vh] overflow-y-auto">
        <p className="font-bold mb-4">Gérer les joueurs</p>

        <ul className="flex flex-col gap-2 mb-5">
          {players.map((p, i) => (
            <li
              key={p.id}
              className="flex items-center justify-between gap-3 bg-slate-900/60 rounded-xl px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="font-semibold truncate">
                  {p.name} {i === currentPlayerIndex && <span className="text-indigo-400">(tour actuel)</span>}
                </p>
                <p className="text-xs text-slate-400">
                  Nv.{p.level} · Score {p.score}/{p.answered}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(p.id)}
                disabled={players.length <= 1}
                className="shrink-0 rounded-lg bg-rose-600 disabled:bg-slate-700 disabled:opacity-40 px-3 py-1.5 text-xs font-semibold active:scale-95 transition"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>

        <form onSubmit={handleAdd} className="border-t border-slate-700 pt-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-slate-400">Ajouter un joueur</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du joueur"
            maxLength={20}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2.5 text-base outline-none focus:border-indigo-400"
          />
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-400">Niveau de départ</span>
              <span className="text-sm font-bold text-yellow-300">
                {level} · {levelData.name}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={allLevels.length}
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="w-full accent-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-400 active:scale-[0.98] transition py-2.5 font-bold"
          >
            Ajouter
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-xl bg-slate-700 py-2.5 font-semibold"
        >
          Fermer
        </button>
      </div>
    </div>
  )
}
