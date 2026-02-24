import { useAppStore } from "../store/useAppStore"
import { matchPlants } from "../utils/plantMatcher"
import type { PlanResult } from "../types"

export function usePlantPlan(): { generate: () => PlanResult } {
  const answers = useAppStore((s) => s.answers)
  const setPlan = useAppStore((s) => s.setPlan)

  const generate = () => {
    const result = matchPlants(answers)
    setPlan(result)
    return result
  }

  return { generate }
}
