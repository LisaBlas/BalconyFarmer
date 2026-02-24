import { useAppStore } from "../../store/useAppStore"
import type { Difficulty } from "../../types"

const levels: { value: Difficulty; label: string; icon: string }[] = [
  { value: "beginner", label: "Beginner — never grown anything", icon: "🌱" },
  { value: "intermediate", label: "Intermediate — some experience", icon: "🪴" },
  { value: "advanced", label: "Advanced — green thumb!", icon: "🌳" },
]

export default function StepExperience() {
  const experience = useAppStore((s) => s.answers.experience)
  const setAnswer = useAppStore((s) => s.setAnswer)

  return (
    <div className="flex flex-col gap-3">
      {levels.map((l) => (
        <button
          key={l.value}
          type="button"
          onClick={() => setAnswer("experience", l.value)}
          className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border-2 text-left transition-all min-h-[52px] ${
            experience === l.value
              ? "bg-mint border-forest text-text"
              : "bg-white border-card-border text-text-secondary"
          }`}
        >
          <span className="text-xl">{l.icon}</span>
          <span className="font-medium text-base">{l.label}</span>
          <span className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs transition-all ${
            experience === l.value ? "bg-forest border-forest text-white" : "border-card-border"
          }`}>
            {experience === l.value && "✓"}
          </span>
        </button>
      ))}
    </div>
  )
}
