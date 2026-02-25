import { useAppStore } from "../../store/useAppStore"
import Input from "../ui/Input"

export default function StepLocation() {
  const answers = useAppStore((s) => s.answers)
  const setAnswer = useAppStore((s) => s.setAnswer)

  const autofill = () => {
    if (!answers.street && !answers.postcode && !answers.region) {
      setAnswer("street", "Lohmühlenstraße 65")
      setAnswer("postcode", "12435")
      setAnswer("region", "Kreuzberg, Berlin")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Street"
        placeholder="e.g. Kottbusser Damm 12"
        value={answers.street}
        onChange={(e) => setAnswer("street", e.target.value)}
        onFocus={autofill}
      />
      <Input
        label="Postcode"
        placeholder="e.g. 10999"
        value={answers.postcode}
        onChange={(e) => setAnswer("postcode", e.target.value)}
        onFocus={autofill}
      />
      <Input
        label="Region"
        placeholder="e.g. Kreuzberg"
        value={answers.region}
        onChange={(e) => setAnswer("region", e.target.value)}
        onFocus={autofill}
      />
    </div>
  )
}
