import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Logo from "../components/layout/Logo"
import Button from "../components/ui/Button"
import { useAppStore } from "../store/useAppStore"

export default function CtaPage() {
  const navigate = useNavigate()
  const reset = useAppStore((s) => s.reset)
  const [toastVisible, setToastVisible] = useState(false)

  const showToast = () => {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2500)
  }

  return (
    <div className="min-h-dvh bg-forest flex flex-col">
      <header className="px-6 pt-5">
        <Logo className="[&_span]:bg-white/20 [&_span]:text-white" />
      </header>

      <main className="flex-1 flex flex-col px-6 pt-8 pb-12">
        <p className="text-lime italic text-sm font-medium mb-1">Let's go!</p>
        <h1 className="font-heading text-[28px] font-bold text-white leading-tight mb-6">
          Bring your balcony to life with us!
        </h1>

        {/* After image */}
        <div className="rounded-2xl overflow-hidden mb-6">
          <img
            src={`${import.meta.env.BASE_URL}images/balconyafter.png`}
            alt="Your balcony transformed into a garden"
            className="w-full aspect-[4/3] object-cover"
          />
        </div>

        <Button className="w-full mb-4">
          Create account
        </Button>

        <p className="text-white/80 text-sm leading-relaxed mb-8">
          With an account you can manage your tasks and get expert help and advice. We'll coach you through the whole process from setting up to maintenance and harvest.
        </p>

        <h2 className="font-heading text-lg font-bold text-white mb-4">Other options:</h2>

        <div className="flex flex-col gap-3">
          <button
            onClick={showToast}
            className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white text-left hover:bg-white/15 transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-cream/20 flex items-center justify-center shrink-0">📄</span>
            <span className="font-medium">Download PDF plan</span>
          </button>

          <button
            onClick={() => navigate("/map")}
            className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white text-left hover:bg-white/15 transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-cream/20 flex items-center justify-center shrink-0">🗺️</span>
            <span className="font-medium">Explore community gardens</span>
          </button>

          <button
            onClick={() => { reset(); navigate("/"); window.scrollTo(0, 0) }}
            className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white text-left hover:bg-white/15 transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-cream/20 flex items-center justify-center shrink-0">🏠</span>
            <span className="font-medium">Go to home page</span>
          </button>
        </div>
      </main>

      {/* Toast */}
      {toastVisible && (
        <div className="fixed bottom-6 left-6 right-6 bg-text text-white rounded-xl px-5 py-4 text-sm font-medium shadow-lg animate-[fadeIn_0.2s_ease-out] text-center">
          PDF download coming soon!
        </div>
      )}
    </div>
  )
}
