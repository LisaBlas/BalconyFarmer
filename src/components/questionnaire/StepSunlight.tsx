import { useAppStore } from "../../store/useAppStore"
import Select from "../ui/Select"
import type { Orientation, WallType } from "../../types"

const orientationOptions = [
  { value: "south", label: "South" },
  { value: "south-west", label: "South-West" },
  { value: "south-east", label: "South-East" },
  { value: "west", label: "West" },
  { value: "east", label: "East" },
  { value: "north-west", label: "North-West" },
  { value: "north-east", label: "North-East" },
  { value: "north", label: "North" },
]

const wallOptions = [
  { value: "glass", label: "Glass railing" },
  { value: "brick", label: "Brick / concrete wall" },
  { value: "metal", label: "Metal railing" },
]

export default function StepSunlight() {
  const answers = useAppStore((s) => s.answers)
  const setAnswer = useAppStore((s) => s.setAnswer)

  return (
    <div className="flex flex-col gap-6">
      <Select
        placeholder="Select orientation"
        options={orientationOptions}
        value={answers.orientation}
        onChange={(e) => setAnswer("orientation", e.target.value as Orientation)}
      />
      <Select
        placeholder="Wall / railing type"
        options={wallOptions}
        value={answers.wallType}
        onChange={(e) => setAnswer("wallType", e.target.value as WallType)}
      />
    </div>
  )
}
