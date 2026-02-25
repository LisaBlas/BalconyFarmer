import { useNavigate } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"
import Logo from "../components/layout/Logo"
import ProgressBar from "../components/ui/ProgressBar"
import Button from "../components/ui/Button"
import StepLocation from "../components/questionnaire/StepLocation"
import StepSunlight from "../components/questionnaire/StepSunlight"
import StepSpace from "../components/questionnaire/StepSpace"
import StepBudget from "../components/questionnaire/StepBudget"
import StepGoals from "../components/questionnaire/StepGoals"
import StepExperience from "../components/questionnaire/StepExperience"
import StepTime from "../components/questionnaire/StepTime"
import StepNeighbours from "../components/questionnaire/StepNeighbours"
import PhotoCapture from "../components/photo/PhotoCapture"

const steps = [
  {
    label: "Question 1 of 8",
    title: "Where is your balcony?",
    subtitle: "Enter your address so we can figure out your climate.",
    component: StepLocation,
  },
  {
    label: "Question 2 of 8",
    title: "How much sun does it get?",
    subtitle: "Light conditions determine which plants will thrive.",
    component: StepSunlight,
  },
  {
    label: "Question 3 of 8",
    title: "How much space is usable?",
    subtitle: "Give us a rough estimate in square metres.",
    component: StepSpace,
  },
  {
    label: "Question 4 of 8",
    title: "What's your budget?",
    subtitle: "Budget-friendly growing is possible, but you may have to make some compromises.",
    component: StepBudget,
  },
  {
    label: "Question 5 of 8",
    title: "What's your goal?",
    subtitle: "Tell us what matters most for your green balcony.",
    component: StepGoals,
  },
  {
    label: "Question 6 of 8",
    title: "Got gardening experience?",
    subtitle: "Help us pick the right plants for you :)",
    component: StepExperience,
  },
  {
    label: "Question 7 of 8",
    title: "How much time can you spend per day?",
    subtitle: "This doesn't mean you have tasks every day but it helps us with the plant selection.",
    component: StepTime,
  },
  {
    label: "Question 8 of 8",
    title: "Who else is joining?",
    subtitle: "Gardening is more fun together! Want to team up?",
    component: StepNeighbours,
  },
  {
    label: "Last step!",
    title: "Show us your balcony!",
    subtitle: "Take a good photo of your whole balcony or upload one.",
    component: PhotoCapture,
  },
]

function useStepValid(step: number): boolean {
  const a = useAppStore((s) => s.answers)
  const photo = useAppStore((s) => s.photo)

  switch (step) {
    case 1: return !!(a.street && a.postcode && a.region)
    case 2: return !!(a.orientation && a.wallType)
    case 3: return !!(a.floorSpace && a.railingSpace && a.wallSpace)
    case 4: return !!a.budget
    case 5: return a.goals.length > 0
    case 6: return !!a.experience
    case 7: return !!a.timeCommitment
    case 8: return !!a.neighbours
    case 9: return !!photo
    default: return true
  }
}

export default function QuestionnairePage() {
  const navigate = useNavigate()
  const step = useAppStore((s) => s.step)
  const setStep = useAppStore((s) => s.setStep)
  const valid = useStepValid(step)

  const idx = step - 1
  const current = steps[idx] || steps[0]
  const StepComponent = current.component
  const isLast = idx === steps.length - 1
  const totalQuestions = steps.length

  const goBack = () => {
    if (step <= 1) navigate("/")
    else setStep(step - 1)
  }

  const goNext = () => {
    if (!valid) return
    if (isLast) navigate("/loading")
    else setStep(step + 1)
  }

  return (
    <div className="min-h-dvh bg-cream flex flex-col">
      {/* Top bar */}
      <header className="px-6 pt-5 pb-3 flex flex-col gap-4">
        <Logo />
        <ProgressBar current={step} total={totalQuestions} />
      </header>

      {/* Content */}
      <main className="flex-1 px-6 pt-4 pb-6 flex flex-col">
        <p className="text-mint-border italic text-sm font-medium mb-1">{current.label}</p>
        <h1 className="font-heading text-[28px] font-bold leading-tight mb-2">{current.title}</h1>
        <p className="text-text-secondary text-base leading-relaxed mb-8">{current.subtitle}</p>

        <div className="flex-1">
          <StepComponent />
        </div>
      </main>

      {/* Bottom nav */}
      <footer className="px-6 pb-8 pt-4 flex items-center gap-4">
        <Button variant="outline" onClick={goBack} className="px-6">
          Back
        </Button>
        <div className="flex-1" />
        <Button variant="primary" onClick={goNext} disabled={!valid}>
          {isLast ? "Done!" : "Next"}
        </Button>
      </footer>
    </div>
  )
}
