import { useAppStore } from "../../store/useAppStore"
import GoalChip from "../ui/GoalChip"
import type { Goal } from "../../types"

const allGoals: { goal: Goal; label: string }[] = [
  { goal: "edible", label: "Grow food I can eat" },
  { goal: "decorative", label: "Make it look beautiful" },
  { goal: "biodiversity", label: "Help bees & butterflies" },
  { goal: "low-effort", label: "Low effort, big effect" },
  { goal: "organic", label: "Fully organic growing" },
]

export default function StepGoals() {
  const selectedGoals = useAppStore((s) => s.answers.goals)
  const budget = useAppStore((s) => s.answers.budget)
  const setAnswer = useAppStore((s) => s.setAnswer)

  const goals = budget === "low"
    ? allGoals.filter((g) => g.goal !== "organic")
    : allGoals

  const toggle = (goal: Goal) => {
    const next = selectedGoals.includes(goal)
      ? selectedGoals.filter((g) => g !== goal)
      : [...selectedGoals, goal]
    setAnswer("goals", next)
  }

  return (
    <div className="flex flex-col gap-3">
      {goals.map((g) => (
        <GoalChip
          key={g.goal}
          goal={g.goal}
          label={g.label}
          selected={selectedGoals.includes(g.goal)}
          onToggle={toggle}
        />
      ))}
    </div>
  )
}
