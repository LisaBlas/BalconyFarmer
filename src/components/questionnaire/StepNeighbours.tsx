import { useState } from "react"
import { useAppStore } from "../../store/useAppStore"
import Input from "../ui/Input"

const suggestions = ["Berte101", "Gartenguru", "Maria.L"]

export default function StepNeighbours() {
  const neighbours = useAppStore((s) => s.answers.neighbours)
  const setAnswer = useAppStore((s) => s.setAnswer)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filtered = suggestions.filter(
    (s) => neighbours && s.toLowerCase().includes(neighbours.toLowerCase()) && s !== neighbours
  )

  const handleFocus = () => {
    if (!neighbours) {
      setAnswer("neighbours", "Berte101")
    }
    setShowSuggestions(true)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Input
          label="Your neighbours' usernames"
          placeholder="e.g. Berte101"
          value={neighbours}
          onChange={(e) => {
            setAnswer("neighbours", e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={handleFocus}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        />
        {showSuggestions && filtered.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-card-border rounded-xl overflow-hidden z-10 shadow-md">
            {filtered.map((s) => (
              <button
                key={s}
                type="button"
                className="w-full text-left px-4 py-3 hover:bg-mint/50 text-base transition-colors"
                onMouseDown={() => {
                  setAnswer("neighbours", s)
                  setShowSuggestions(false)
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
