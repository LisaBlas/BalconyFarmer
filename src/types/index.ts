export type SunRequirement = "full-sun" | "partial-shade" | "full-shade"
export type Difficulty = "beginner" | "intermediate" | "advanced"
export type SpaceType = "floor" | "railing" | "wall"
export type WallType = "glass" | "brick" | "metal"
export type Orientation = "south" | "south-west" | "south-east" | "west" | "east" | "north-west" | "north-east" | "north"
export type Budget = "low" | "medium" | "high"
export type TimeCommitment = "5min" | "15min" | "30min" | "unlimited"
export type Goal = "edible" | "decorative" | "biodiversity" | "low-effort" | "organic"

export interface Plant {
  id: string
  name: string
  scientificName: string
  category: Goal[]
  sunRequirement: SunRequirement
  difficulty: Difficulty
  spaceTypes: SpaceType[]
  wallCompatibility: WallType[]
  wateringFrequency: string
  minSpaceSqm: number
  description: string
  careNotes: string
  harvestMonth: string | null
  sowingMonth: string
  bloomSeason?: string
  image: string
  quantity: number
  materials: string[]
}

export interface GardenMarker {
  id: string
  username: string
  lat: number
  lng: number
  title: string
  description: string
  plants: string[]
  image: string
  yearStarted: number
}

export interface QuestionnaireAnswers {
  street: string
  postcode: string
  region: string
  orientation: Orientation | ""
  wallType: WallType | ""
  floorSpace: string
  railingSpace: string
  wallSpace: string
  budget: Budget | ""
  goals: Goal[]
  experience: Difficulty | ""
  timeCommitment: TimeCommitment | ""
  neighbours: string
}

export interface CalendarTask {
  date: string
  task: string
  plantId: string
}

export interface PlanResult {
  plants: Plant[]
  materials: { name: string; quantity: number; unit: string; description: string }[]
  calendar: CalendarTask[]
}
