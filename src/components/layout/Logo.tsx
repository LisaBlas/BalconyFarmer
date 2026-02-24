import { useNavigate } from "react-router-dom"
import { useAppStore } from "../../store/useAppStore"

export default function Logo({ className = "" }: { className?: string }) {
  const navigate = useNavigate()
  const reset = useAppStore((s) => s.reset)

  return (
    <button
      onClick={() => { reset(); navigate("/"); window.scrollTo(0, 0) }}
      className={`flex items-center gap-2 ${className}`}
      aria-label="Go to home page"
    >
      <span className="w-10 h-10 rounded-xl bg-text text-cream flex items-center justify-center font-heading text-lg font-bold">
        ✳
      </span>
    </button>
  )
}
