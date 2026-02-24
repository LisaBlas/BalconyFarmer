import { useAppStore } from "../../store/useAppStore"
import type { TimeCommitment } from "../../types"

const options: { value: TimeCommitment; label: string; icon: string }[] = [
  { value: "5min", label: "Max. 5 minutes per day", icon: "⏱️" },
  { value: "15min", label: "Max. 15 minutes per day", icon: "⏱️" },
  { value: "30min", label: "Max. 30 minutes per day", icon: "⏱️" },
  { value: "unlimited", label: "I have no limit!", icon: "🌟" },
]

export default function StepTime() {
  const timeCommitment = useAppStore((s) => s.answers.timeCommitment)
  const setAnswer = useAppStore((s) => s.setAnswer)

  return (
    <div className="flex flex-col gap-3">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setAnswer("timeCommitment", o.value)}
          className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border-2 text-left transition-all min-h-[52px] ${
            timeCommitment === o.value
              ? "bg-mint border-forest text-text"
              : "bg-white border-card-border text-text-secondary"
          }`}
        >
          <span className="text-xl shrink-0">{o.icon}</span>
          <span className="font-medium text-sm leading-snug">{o.label}</span>
          <span className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs transition-all shrink-0 ${
            timeCommitment === o.value ? "bg-forest border-forest text-white" : "border-card-border"
          }`}>
            {timeCommitment === o.value && "✓"}
          </span>
        </button>
      ))}
    </div>
  )
}
