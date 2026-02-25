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
      <span className="w-10 h-10 rounded-xl bg-text flex items-center justify-center">
        <img
          src={`${import.meta.env.BASE_URL}images/logo.png`}
          alt="BalkonGrün"
          className="w-6 h-6 object-contain"
        />
      </span>
    </button>
  )
}
