import { type InputHTMLAttributes, useState } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  infoTip?: string
}

export default function Input({ label, infoTip, className = "", ...props }: InputProps) {
  const [showTip, setShowTip] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-text">{label}</label>
        {infoTip && (
          <button
            type="button"
            onClick={() => setShowTip(!showTip)}
            className="w-5 h-5 rounded-full border-2 border-mint-border text-mint-border flex items-center justify-center text-[11px] font-bold shrink-0 hover:bg-mint/50 transition-colors"
            aria-label={`Info about ${label}`}
          >
            i
          </button>
        )}
      </div>
      {showTip && infoTip && (
        <p className="text-text-secondary text-xs leading-relaxed bg-mint/40 border border-mint-border/40 rounded-lg px-3 py-2">
          {infoTip}
        </p>
      )}
      <input
        className={`w-full bg-mint border-2 border-mint-border rounded-xl px-4 py-3.5 text-base text-text placeholder:text-mint-border/70 outline-none focus:ring-2 focus:ring-forest/30 transition-all min-h-[52px] ${className}`}
        {...props}
      />
    </div>
  )
}
