import { useEffect } from 'react'

interface Props {
  playerName: string
  level: number
  levelName: string
  durationMs?: number
  onDone: () => void
}

const DEFAULT_DURATION_MS = 2500
const AVATAR_COLORS = ['bg-indigo-500', 'bg-emerald-500', 'bg-rose-500', 'bg-yellow-400', 'bg-sky-500', 'bg-orange-500']

function colorFor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

export default function TurnTransition({ playerName, level, levelName, durationMs = DEFAULT_DURATION_MS, onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDone, durationMs)
    return () => clearTimeout(timer)
  }, [onDone, durationMs])

  return (
    <div
      className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6"
      role="status"
      aria-live="polite"
      onClick={onDone}
    >
      <div className="turn-card text-center">
        <div className="relative mx-auto mb-5 w-24 h-24 flex items-center justify-center">
          <span className={`turn-avatar-pulse absolute inset-0 rounded-full ${colorFor(playerName)}`} />
          <span className={`relative w-24 h-24 rounded-full ${colorFor(playerName)} flex items-center justify-center text-4xl font-black text-white shadow-lg`}>
            {playerName.trim().charAt(0).toUpperCase() || '?'}
          </span>
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-2">Au tour de</p>
        <h2 className="text-3xl font-black text-white mb-2">{playerName}</h2>
        <p className="text-sm text-slate-400">
          Niveau {level} · {levelName}
        </p>
      </div>

      <div className="absolute bottom-10 w-40 h-1 rounded-full bg-slate-800 overflow-hidden">
        <div className="turn-bar h-full bg-indigo-400" style={{ animationDuration: `${durationMs}ms` }} />
      </div>
    </div>
  )
}
