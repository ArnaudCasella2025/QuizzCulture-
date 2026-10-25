interface Props {
  playerName: string
  level: number
  levelName: string
  onClose: () => void
}

const CONFETTI = ['🎉', '✨', '⭐', '🎊', '✨', '⭐', '🎉', '✨']

export default function LevelUpModal({ playerName, level, levelName, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Niveau supérieur débloqué"
    >
      <div className="relative overflow-hidden">
        {CONFETTI.map((emoji, i) => (
          <span
            key={i}
            className="levelup-confetti pointer-events-none absolute top-0 text-2xl"
            style={{
              left: `${8 + i * 12}%`,
              animationDuration: `${1.6 + (i % 3) * 0.4}s`,
              animationDelay: `${i * 0.12}s`,
            }}
          >
            {emoji}
          </span>
        ))}

        <div className="levelup-card relative bg-gradient-to-b from-indigo-600 to-indigo-800 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl shadow-indigo-950/70 border border-indigo-400/40">
          <div className="relative mx-auto mb-4 w-24 h-24 flex items-center justify-center">
            <span className="levelup-ring absolute inset-0 rounded-full border-4 border-yellow-300" />
            <span className="levelup-badge text-6xl">🏆</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-1">
            Niveau supérieur !
          </p>
          <h2 className="text-2xl font-black text-yellow-300 mb-1">Bravo {playerName} !</h2>
          <p className="text-indigo-100 mb-5">
            Tu passes au niveau <span className="font-bold text-white">{level}</span>
            <br />
            <span className="text-sm">{levelName}</span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-yellow-300 hover:bg-yellow-200 active:scale-[0.98] transition py-3 font-bold text-indigo-950"
          >
            Continuer 🎉
          </button>
        </div>
      </div>
    </div>
  )
}
