import { create } from "zustand"
import type { QuestionnaireAnswers, PlanResult } from "../types"

interface AppState {
  step: number
  answers: QuestionnaireAnswers
  photo: string | null
  plan: PlanResult | null
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setAnswer: <K extends keyof QuestionnaireAnswers>(key: K, value: QuestionnaireAnswers[K]) => void
  setPhoto: (photo: string | null) => void
  setPlan: (plan: PlanResult) => void
  reset: () => void
}

const initialAnswers: QuestionnaireAnswers = {
  street: "",
  postcode: "",
  region: "",
  orientation: "",
  wallType: "",
  floorSpace: "",
  railingSpace: "",
  wallSpace: "",
  budget: "",
  goals: [],
  experience: "",
  timeCommitment: "",
  neighbours: "",
}

export const useAppStore = create<AppState>((set) => ({
  step: 1,
  answers: { ...initialAnswers },
  photo: null,
  plan: null,
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: s.step + 1 })),
  prevStep: () => set((s) => ({ step: Math.max(1, s.step - 1) })),
  setAnswer: (key, value) =>
    set((s) => ({ answers: { ...s.answers, [key]: value } })),
  setPhoto: (photo) => set({ photo }),
  setPlan: (plan) => set({ plan }),
  reset: () => set({ step: 1, answers: { ...initialAnswers }, photo: null, plan: null }),
}))
