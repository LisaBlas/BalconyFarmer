import { useState } from "react"
import { useAppStore } from "../../store/useAppStore"
import Input from "../ui/Input"

export default function StepSpace() {
  const answers = useAppStore((s) => s.answers)
  const setAnswer = useAppStore((s) => s.setAnswer)
  const [showRailingInfo, setShowRailingInfo] = useState(false)

  const autofill = () => {
    if (!answers.floorSpace && !answers.railingSpace && !answers.wallSpace) {
      setAnswer("floorSpace", "2")
      setAnswer("railingSpace", "2")
      setAnswer("wallSpace", "2")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Floor space (m²)"
        infoTip="Measure the floor area you can place pots on. A typical balcony is 3–6 m²."
        type="number"
        inputMode="decimal"
        placeholder="e.g. 3"
        value={answers.floorSpace}
        onChange={(e) => setAnswer("floorSpace", e.target.value)}
        onFocus={autofill}
      />

      <div>
        <Input
          label="Railing / hanging (m²)"
          infoTip="A shoe-box size planter hanging from a railing is approx. 0.2 m². Count how many fit along your railing."
          type="number"
          inputMode="decimal"
          placeholder="e.g. 1.5"
          value={answers.railingSpace}
          onChange={(e) => setAnswer("railingSpace", e.target.value)}
          onFocus={autofill}
        />
        <button
          type="button"
          onClick={() => setShowRailingInfo(!showRailingInfo)}
          className="flex items-center gap-1.5 text-mint-border text-xs font-medium mt-2 hover:text-forest transition-colors"
        >
          <span className="w-4 h-4 rounded-full border border-mint-border flex items-center justify-center text-[10px]">!</span>
          Important: Is your railing allowed?
        </button>
      </div>

      <Input
        label="Wall / vertical (m²)"
        infoTip="Wall-mounted planters or vertical pockets. Measure the wall area you can use."
        type="number"
        inputMode="decimal"
        placeholder="e.g. 0.5"
        value={answers.wallSpace}
        onChange={(e) => setAnswer("wallSpace", e.target.value)}
        onFocus={autofill}
      />

      {/* Railing info overlay */}
      {showRailingInfo && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
          onClick={() => setShowRailingInfo(false)}
        >
          <div
            className="bg-white rounded-t-2xl w-full max-w-md px-6 pt-6 pb-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg">Railing planters</h3>
              <button
                onClick={() => setShowRailingInfo(false)}
                className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center text-text-secondary hover:bg-card-border transition-colors"
              >
                ×
              </button>
            </div>
            <p className="text-text-secondary text-base leading-relaxed mb-3">
              Not every building allows planters hanging on the outside of railings — especially in rented apartments. Planters that fall can injure people below.
            </p>
            <p className="text-text-secondary text-base leading-relaxed mb-3">
              <span className="font-medium text-text">Check with your landlord</span> or building management before hanging anything outward.
            </p>
            <p className="text-text-secondary text-base leading-relaxed">
              <span className="font-medium text-text">Tip:</span> Inward-facing planters are almost always fine and safer. We'll recommend those by default.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
