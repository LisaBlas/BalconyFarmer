import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { usePlantPlan } from "../hooks/usePlantPlan"
import Logo from "../components/layout/Logo"

export default function LoadingPage() {
  const navigate = useNavigate()
  const { generate } = usePlantPlan()

  useEffect(() => {
    const timer = setTimeout(() => {
      generate()
      navigate("/plan", { replace: true })
    }, 5000)
    return () => clearTimeout(timer)
  }, [generate, navigate])

  return (
    <div className="min-h-dvh bg-forest flex flex-col">
      <header className="px-6 pt-5">
        <Logo className="[&_span]:bg-white/20 [&_span]:text-white" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
        {/* Plant spinner — 6 leaves rotating around a center */}
        <div className="relative w-24 h-24 animate-[spin_2.5s_linear_infinite]">
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <svg
              key={deg}
              width="20"
              height="32"
              viewBox="0 0 20 32"
              fill="none"
              className="absolute left-1/2 top-0 -ml-[10px] origin-[50%_48px]"
              style={{
                transform: `rotate(${deg}deg)`,
                opacity: 0.5 + (i / 6) * 0.5,
              }}
            >
              <path
                d="M10 2 C16 6, 18 16, 10 30 C2 16, 4 6, 10 2Z"
                fill="white"
              />
              <path
                d="M10 6 L10 24"
                stroke="rgba(107,175,115,0.5)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          ))}
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white/80" />
          </div>
        </div>

        <h1 className="font-heading text-[28px] font-bold text-white text-center leading-tight">
          One moment...
          <br />
          Your plant plan is being created!
        </h1>
      </main>

      <footer className="px-6 pb-8 flex justify-end">
        <button
          onClick={() => navigate("/")}
          className="text-white/70 border border-white/30 rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
        >
          Cancel
        </button>
      </footer>
    </div>
  )
}
