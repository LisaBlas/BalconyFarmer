import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Logo from "../components/layout/Logo"
import { useAppStore } from "../store/useAppStore"

export default function HomePage() {
  const navigate = useNavigate()
  const reset = useAppStore((s) => s.reset)
  return (
    <div className="min-h-dvh bg-cream flex flex-col">
      {/* Header */}
      <header className="px-6 pt-5 pb-2">
        <Logo />
      </header>

      {/* Hero image */}
      <div className="px-6 pt-4">
        <div className="max-w-md mx-auto w-full rounded-2xl overflow-hidden border-3 border-lime">
          <img
            src={`${import.meta.env.BASE_URL}images/hero.jpg`}
            alt="Balcony garden inspiration"
            className="w-full aspect-[16/9] object-cover"
          />
        </div>
      </div>

      {/* Hero */}
      <main className="flex-1 flex flex-col px-6 pt-6 pb-10">
        <div className="max-w-md mx-auto w-full flex flex-col">
          {/* Hero heading */}
          <h1 className="font-heading text-[32px] font-bold leading-[1.15] mb-5">
            Ready for your
            <br />
            <span className="inline-block bg-lime px-2 py-0.5 rounded-lg -rotate-1">Balcony</span>
            <br />
            Farm?
          </h1>

          {/* CTA button */}
          <button
            onClick={() => { reset(); navigate("/questionnaire") }}
            className="self-start bg-lime text-text font-heading font-bold text-base py-3 px-8 rounded-full hover:brightness-95 active:scale-[0.98] transition-all border-2 border-text"
          >
            Let's get started!
          </button>

          {/* Features section */}
          <section className="mt-12">
            <h2 className="font-heading text-xl font-bold mb-5">We're here to help!</h2>
            <div className="flex flex-col gap-4">
              <FeatureCard
                emoji="🌱"
                title="Personalised plant plan"
                description="Answer a few questions about your balcony and get a custom selection of plants that will actually thrive."
              />
              <FeatureCard
                emoji="🛒"
                title="Shopping list"
                description="Know exactly what soil, pots, and tools you need — no more guessing at the garden centre."
              />
              <FeatureCard
                emoji="📅"
                title="Planting calendar"
                description="Get a week-by-week schedule so you always know what to do and when."
              />
            </div>
          </section>

          {/* Possibilities teaser */}
          <section className="mt-12">
            <h2 className="font-heading text-xl font-bold mb-4">So many possibilities...</h2>
            <PossibilitiesCarousel />
            <button
              onClick={() => navigate("/map")}
              className="mt-4 self-start bg-lime text-text font-heading font-bold text-base py-3 px-8 rounded-full hover:brightness-95 active:scale-[0.98] transition-all border-2 border-text"
            >
              Explore balconies
            </button>
          </section>

          {/* Testimonials */}
          <section className="mt-12">
            <h2 className="font-heading text-xl font-bold mb-5">Hear from the farmers:</h2>
            <div className="flex flex-col gap-3">
              <Testimonial
                name="Berte101"
                text="I never thought I could grow tomatoes in Kreuzberg. BalkonGrün made it so easy — my balcony looks amazing now!"
              />
              <Testimonial
                name="Gartenguru"
                text="The planting calendar is a game changer. I always know exactly what to do and when. Love it!"
              />
              <Testimonial
                name="Maria.L"
                text="Finally a tool that understands Berlin balconies. The plant recommendations were spot-on for my shady north-facing spot."
              />
            </div>
          </section>

          {/* About */}
          <section
            className="mt-12 mb-4 relative overflow-hidden rounded-2xl bg-white border-2 border-card-border p-6"
            style={{
              backgroundImage: `url(${import.meta.env.BASE_URL}images/logo.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-white/80 pointer-events-none" />
            <div className="relative">
              <h2 className="font-heading text-xl font-bold mb-3">About balcony farmer</h2>
              <p className="text-text-secondary text-base leading-relaxed">
                We've noticed the unused potential of balcony spaces in urban areas and we want to change that! We believe that everyone should have the opportunity to grow their own plants, no matter where they live or what skills and resources they have.
              </p>
              <p className="text-text-secondary text-base leading-relaxed mt-3">
                Our plant recommendations are based on expert knowledge and scientific research, to ensure the best results for every user and every plant.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="bg-white border-2 border-card-border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{emoji}</span>
        <h3 className="font-heading font-bold text-base">{title}</h3>
      </div>
      <p className="text-text-secondary text-base leading-relaxed">{description}</p>
    </div>
  )
}

function Testimonial({ name, text }: { name: string; text: string }) {
  return (
    <div className="rounded-2xl p-5 bg-forest text-white">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base bg-white/20">
          👤
        </div>
        <span className="text-base font-medium text-lime">{name}</span>
      </div>
      <p className="text-base leading-relaxed text-white/90">{text}</p>
    </div>
  )
}

const carouselImages = [
  "Urbangreenberlin1.jpg", "Bienemaja421.png",
  "Tomatenkarl1.jpg", "Balkonlisa2.jpg",
  "Gruenermax3.jpg", "Urbangreenberlin2.jpg",
  "Tomatenkarl3.png", "Bienemaja423.jpg",
  "Balkonlisa1.jpg", "Gruenermax1.jpg",
]

function PossibilitiesCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % 10)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative rounded-2xl overflow-hidden border-3 border-lime">
      <img
        src={`${import.meta.env.BASE_URL}images/gardens/${carouselImages[active]}`}
        alt={`Balcony inspiration ${active + 1}`}
        className="w-full aspect-[16/9] object-cover"
      />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {Array.from({ length: 10 }, (_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              active === i ? "bg-white w-4" : "bg-white/50"
            }`}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
