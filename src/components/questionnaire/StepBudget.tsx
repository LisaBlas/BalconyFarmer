import { useAppStore } from "../../store/useAppStore"
import type { Budget } from "../../types"

const options: { value: Budget; label: string; icon: string }[] = [
  { value: "low", label: "Low budget — upcycled or free containers, cheaper materials (non-organic)", icon: "💰" },
  { value: "medium", label: "Medium budget — average recommendations", icon: "💰💰" },
  { value: "high", label: "High budget — best quality materials", icon: "💰💰💰" },
]

export default function StepBudget() {
  const budget = useAppStore((s) => s.answers.budget)
  const setAnswer = useAppStore((s) => s.setAnswer)

  return (
    <div className="flex flex-col gap-3">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setAnswer("budget", o.value)}
          className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border-2 text-left transition-all min-h-[52px] ${
            budget === o.value
              ? "bg-mint border-forest text-text"
              : "bg-white border-card-border text-text-secondary"
          }`}
        >
          <span className="text-xl shrink-0">{o.icon}</span>
          <span className="font-medium text-base leading-snug">{o.label}</span>
          <span className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs transition-all shrink-0 ${
            budget === o.value ? "bg-forest border-forest text-white" : "border-card-border"
          }`}>
            {budget === o.value && "✓"}
          </span>
        </button>
      ))}
    </div>
  )
}
