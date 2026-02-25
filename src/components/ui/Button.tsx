import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost"
  children: ReactNode
}

const styles = {
  primary:
    "bg-lime text-text font-heading font-bold py-4 px-8 rounded-2xl text-lg hover:brightness-95 active:scale-[0.98] transition-all min-h-[52px]",
  outline:
    "border-2 border-text text-text font-heading font-bold py-3 px-6 rounded-2xl text-base hover:bg-text/5 active:scale-[0.98] transition-all min-h-[48px]",
  ghost:
    "text-text-secondary font-medium py-2 px-4 rounded-xl hover:bg-text/5 transition-all",
}

export default function Button({ variant = "primary", className = "", disabled, children, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles[variant]} ${disabled ? "opacity-40 pointer-events-none" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
