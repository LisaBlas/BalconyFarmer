import type { Plant, QuestionnaireAnswers, PlanResult, SunRequirement, CalendarTask } from "../types"
import plantsData from "../data/plants.json"

const sunMapping: Record<string, SunRequirement> = plantsData.matchingRules.sunMapping as Record<string, SunRequirement>
const difficultyOrder = ["beginner", "intermediate", "advanced"]

export function matchPlants(answers: QuestionnaireAnswers): PlanResult {
  const plants = plantsData.plants as Plant[]
  const userSun = answers.orientation ? sunMapping[answers.orientation] : "partial-shade"
  const userDiffIdx = answers.experience ? difficultyOrder.indexOf(answers.experience) : 2
  const spaceTypes: string[] = []
  if (answers.floorSpace && parseFloat(answers.floorSpace) > 0) spaceTypes.push("floor")
  if (answers.railingSpace && parseFloat(answers.railingSpace) > 0) spaceTypes.push("railing")
  if (answers.wallSpace && parseFloat(answers.wallSpace) > 0) spaceTypes.push("wall")
  if (spaceTypes.length === 0) spaceTypes.push("floor", "railing")

  const scored = plants
    .map((plant) => {
      let score = 0

      // Sun compatibility (strongest signal)
      if (plant.sunRequirement === userSun) score += 10
      else if (
        (userSun === "full-sun" && plant.sunRequirement === "partial-shade") ||
        (userSun === "partial-shade" && plant.sunRequirement !== "full-shade") ||
        (userSun === "full-shade" && plant.sunRequirement === "partial-shade")
      ) score += 4

      // Space type match
      if (plant.spaceTypes.some((s) => spaceTypes.includes(s))) score += 5
      else return { plant, score: -1 }

      // Wall compatibility
      if (answers.wallType && plant.wallCompatibility.includes(answers.wallType)) score += 2

      // Goal alignment
      if (answers.goals.length > 0) {
        const goalMatch = plant.category.some((c) => answers.goals.includes(c))
        if (goalMatch) score += 6
        // "low-effort" goal: boost easy, low-maintenance plants
        if (answers.goals.includes("low-effort") && plant.difficulty === "beginner") score += 4
      }

      // Difficulty
      const plantDiffIdx = difficultyOrder.indexOf(plant.difficulty)
      if (plantDiffIdx <= userDiffIdx) score += 3

      return { plant, score }
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)

  // Pick 5-8 plants, ensuring goal variety
  const selected: Plant[] = []
  const usedCategories = new Set<string>()

  for (const { plant } of scored) {
    if (selected.length >= 8) break
    const isNewCategory = plant.category.some((c) => !usedCategories.has(c))
    if (selected.length < 5 || isNewCategory) {
      selected.push(plant)
      plant.category.forEach((c) => usedCategories.add(c))
    }
  }

  // Build materials list
  const materialCount = new Map<string, number>()
  selected.forEach((p) => {
    p.materials.forEach((m) => {
      materialCount.set(m, (materialCount.get(m) || 0) + (p.quantity || 1))
    })
  })

  const materials = Array.from(materialCount.entries()).map(([name, quantity]) => ({
    name,
    quantity,
    unit: "×",
    description: "",
  }))

  // Build calendar from 2026-02-27
  const calendar: CalendarTask[] = []
  const baseDate = new Date(2026, 1, 27) // Feb 27, 2026

  selected.forEach((p, i) => {
    const sowDate = new Date(baseDate)
    sowDate.setDate(sowDate.getDate() + i * 3)
    calendar.push({
      date: sowDate.toISOString().split("T")[0],
      task: `Prepare and sow ${p.name}`,
      plantId: p.id,
    })

    const waterDate = new Date(sowDate)
    waterDate.setDate(waterDate.getDate() + 7)
    calendar.push({
      date: waterDate.toISOString().split("T")[0],
      task: `First watering check for ${p.name}`,
      plantId: p.id,
    })
  })

  calendar.sort((a, b) => a.date.localeCompare(b.date))

  return { plants: selected, materials, calendar }
}
