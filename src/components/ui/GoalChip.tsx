import type { Goal } from "../../types"

interface GoalChipProps {
  goal: Goal
  label: string
  selected: boolean
  onToggle: (goal: Goal) => void
}

const icons: Record<Goal, string> = {
  edible: "🥬",
  decorative: "🌸",
  biodiversity: "🐝",
  "low-effort": "✨",
  organic: "🌿",
}

export default function GoalChip({ goal, label, selected, onToggle }: GoalChipProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(goal)}
      className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border-2 text-left transition-all min-h-[52px] ${
        selected
          ? "bg-mint border-forest text-text"
          : "bg-white border-card-border text-text-secondary"
      }`}
    >
      <span className="text-xl">{icons[goal]}</span>
      <span className="font-medium text-base">{label}</span>
      <span className={`ml-auto w-5 h-5 rounded border-2 flex items-center justify-center text-xs transition-all ${
        selected ? "bg-forest border-forest text-white" : "border-card-border"
      }`}>
        {selected && "✓"}
      </span>
    </button>
  )
}
