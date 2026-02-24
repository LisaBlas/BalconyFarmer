import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"
import Logo from "../components/layout/Logo"
import Button from "../components/ui/Button"
import type { Plant } from "../types"

type Tab = "plants" | "neighbours" | "materials" | "calendar"
type View = "cover" | "tabs"

export default function PlanPage() {
  const navigate = useNavigate()
  const plan = useAppStore((s) => s.plan)
  const [view, setView] = useState<View>("cover")
  const [activeTab, setActiveTab] = useState<Tab>("plants")
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)

  if (!plan) {
    navigate("/questionnaire", { replace: true })
    return null
  }

  const tabOrder: Tab[] = ["plants", "neighbours", "materials", "calendar"]
  const tabs: { key: Tab; label: string }[] = [
    { key: "plants", label: "1. Plants" },
    { key: "neighbours", label: "2. Neighbours" },
    { key: "materials", label: "3. Materials" },
    { key: "calendar", label: "4. Tasks" },
  ]

  return (
    <div className="min-h-dvh bg-cream flex flex-col">
      <header className="px-6 pt-5 pb-4">
        <Logo />
      </header>

      <main className="flex-1 px-6 pb-6 flex flex-col">
        <p className="text-mint-border italic text-sm font-medium mb-1">Let's go!</p>
        <h1 className="font-heading text-[28px] font-bold leading-tight mb-6">
          Your new
          <br />
          balcony farm
        </h1>

        {view === "cover" ? (
          /* Title / cover view */
          <div className="flex-1 flex flex-col">
            <div className="bg-white border-2 border-card-border rounded-2xl overflow-hidden flex-1 flex flex-col">
              <div className="flex-1 p-4">
                <img
                  src={`${import.meta.env.BASE_URL}images/balconyafter.png`}
                  alt="Your balcony transformed into a garden"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="mt-6">
              <Button
                onClick={() => { setView("tabs"); setActiveTab("plants"); window.scrollTo(0, 0) }}
                className="w-full"
              >
                The Details
              </Button>
            </div>
          </div>
        ) : (
          /* Tabbed detail view */
          <>
            <div className="bg-white border-2 border-card-border rounded-2xl flex-1 flex flex-col overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-card-border">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => { setActiveTab(t.key); setSelectedPlant(null) }}
                    className={`flex-1 py-3 text-xs font-medium transition-colors ${
                      activeTab === t.key
                        ? "text-text border-b-2 border-forest"
                        : "text-text-secondary"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="flex-1 p-5 overflow-y-auto">
                {activeTab === "plants" && (
                  <PlantsTab
                    plants={plan.plants}
                    selectedPlant={selectedPlant}
                    onSelect={setSelectedPlant}
                  />
                )}
                {activeTab === "neighbours" && <NeighboursTab />}
                {activeTab === "materials" && <MaterialsTab materials={plan.materials} />}
                {activeTab === "calendar" && <CalendarTab calendar={plan.calendar} />}
              </div>
            </div>

            {/* Bottom nav */}
            <div className="mt-6 flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  const tabIdx = tabOrder.indexOf(activeTab)
                  if (tabIdx <= 0) {
                    setView("cover")
                  } else {
                    setActiveTab(tabOrder[tabIdx - 1])
                    setSelectedPlant(null)
                  }
                  window.scrollTo(0, 0)
                }}
                className="px-6"
              >
                Back
              </Button>
              <div className="flex-1" />
              {activeTab === "calendar" ? (
                <Button onClick={() => { navigate("/cta"); window.scrollTo(0, 0) }}>
                  Let's go!
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    const tabIdx = tabOrder.indexOf(activeTab)
                    setActiveTab(tabOrder[tabIdx + 1])
                    setSelectedPlant(null)
                    window.scrollTo(0, 0)
                  }}
                >
                  Next
                </Button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

function PlantsTab({
  plants,
  selectedPlant,
  onSelect,
}: {
  plants: Plant[]
  selectedPlant: Plant | null
  onSelect: (p: Plant) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      {/* Plant grid */}
      <h2 className="font-heading font-bold text-lg">Your plants</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
        {plants.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className={`relative shrink-0 w-20 h-20 rounded-xl border-2 flex items-center justify-center text-3xl transition-all ${
              selectedPlant?.id === p.id
                ? "border-forest bg-mint/50"
                : "border-card-border bg-mint/20"
            }`}
          >
            <span className="text-2xl">{p.category.includes("edible") ? "🌿" : p.category.includes("biodiversity") ? "🌼" : "🌸"}</span>
            <span className="absolute -top-2 -right-2 bg-lime text-text text-[11px] font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {p.quantity}×
            </span>
          </button>
        ))}
      </div>

      {/* Selected plant detail */}
      {selectedPlant ? (
        <div className="flex flex-col gap-3">
          <h3 className="font-heading font-bold text-xl">{selectedPlant.name}</h3>
          <p className="text-text-secondary text-sm leading-relaxed">{selectedPlant.description}</p>
          <p className="text-text-secondary text-sm leading-relaxed">{selectedPlant.careNotes}</p>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <InfoPill label="Water" value={selectedPlant.wateringFrequency} />
            <InfoPill label="Sun" value={selectedPlant.sunRequirement.replace("-", " ")} />
            <InfoPill label="Sow" value={selectedPlant.sowingMonth} />
            <InfoPill label="Harvest" value={selectedPlant.harvestMonth || selectedPlant.bloomSeason || "—"} />
          </div>
        </div>
      ) : (
        <p className="text-text-secondary text-sm">Tap a plant to see details</p>
      )}
    </div>
  )
}

function MaterialsTab({ materials }: { materials: { name: string; quantity: number; unit: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading font-bold text-lg">Materials</h2>
      <div className="flex flex-col gap-3">
        {materials.map((m) => (
          <div key={m.name} className="flex items-center gap-4 py-2">
            <span className="w-10 h-10 rounded-lg bg-mint flex items-center justify-center text-lg shrink-0">
              📦
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-base truncate">{m.name}</p>
            </div>
            <span className="bg-lime text-text text-xs font-bold rounded-full px-2.5 py-1 shrink-0">
              {m.quantity}×
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CalendarTab({ calendar }: { calendar: { date: string; task: string }[] }) {
  const startDate = new Date("2026-03-12")
  const days = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(startDate)
    d.setDate(d.getDate() + i)
    return d
  })

  const tasksByDay = days.map((day) => {
    const key = day.toISOString().split("T")[0]
    const label = day.toLocaleDateString("en-GB", { weekday: "short", month: "short", day: "numeric" })
    const matched = calendar.filter((t) => t.date === key).map((t) => t.task)
    // If no exact date match, distribute tasks across days
    return { label, tasks: matched }
  })

  // If calendar dates don't align with our 5-day window, spread tasks evenly
  const hasAnyTasks = tasksByDay.some((d) => d.tasks.length > 0)
  const distributed = hasAnyTasks
    ? tasksByDay
    : tasksByDay.map((d, i) => ({
        ...d,
        tasks: calendar
          .filter((_, idx) => idx % 5 === i)
          .map((t) => t.task),
      }))

  // Collect dates that have tasks for the mini calendar dots
  const taskDates = new Set(
    hasAnyTasks
      ? days.filter((_, i) => tasksByDay[i].tasks.length > 0).map((d) => d.toISOString().split("T")[0])
      : calendar.map((t) => t.date)
  )

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-heading font-bold text-lg">Your first tasks</h2>

      <div className="bg-mint/30 rounded-xl p-4">
        <p className="text-text-secondary text-sm leading-relaxed">
          You can start these tasks once you have gathered the relevant materials — we have given you a default of 2 weeks from now to gather everything. You can change this schedule with an account.
        </p>
      </div>

      {distributed.map(({ label, tasks }) => (
        <div key={label} className="flex flex-col gap-2">
          <p className="font-heading font-bold text-base">{label}</p>
          {tasks.length > 0 ? (
            tasks.map((task, i) => (
              <div key={i} className="flex items-start gap-3 pl-1">
                <span className="w-4 h-4 mt-1 rounded border-2 border-mint-border shrink-0" />
                <p className="text-text-secondary text-sm leading-relaxed">{task}</p>
              </div>
            ))
          ) : (
            <p className="text-text-secondary/50 text-sm pl-1">No tasks</p>
          )}
        </div>
      ))}

      <MiniCalendar taskDates={taskDates} />
    </div>
  )
}

function NeighboursTab() {
  const neighbourPlants = [
    { name: "Lavender", icon: "🌸", quantity: 3 },
    { name: "Rosemary", icon: "🌿", quantity: 2 },
    { name: "Strawberries", icon: "🍓", quantity: 4 },
    { name: "Marigolds", icon: "🌼", quantity: 3 },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-mint flex items-center justify-center text-lg shrink-0">👩‍🌾</span>
        <h2 className="font-heading font-bold text-lg">Berte101's balcony</h2>
      </div>

      <div className="bg-mint/30 rounded-xl p-4">
        <p className="text-text-secondary text-sm leading-relaxed">
          Your plans have been analyzed and compared to find ways your balconies can complement each other. Your materials lists have been combined to help you gather things more efficiently.
        </p>
      </div>

      <div className="rounded-xl overflow-hidden border-2 border-card-border">
        <img
          src={`${import.meta.env.BASE_URL}images/balconyafter.png`}
          alt="Berte101's balcony plan"
          className="w-full h-40 object-cover"
        />
      </div>

      <h3 className="font-heading font-bold text-base">What Berte101 is growing</h3>
      <div className="flex flex-col gap-3">
        {neighbourPlants.map((p) => (
          <div key={p.name} className="flex items-center gap-4 py-2">
            <span className="w-10 h-10 rounded-lg bg-mint flex items-center justify-center text-lg shrink-0">
              {p.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-base truncate">{p.name}</p>
            </div>
            <span className="bg-lime text-text text-xs font-bold rounded-full px-2.5 py-1 shrink-0">
              {p.quantity}×
            </span>
          </div>
        ))}
      </div>

      <div className="bg-forest/10 rounded-xl p-4 mt-1">
        <p className="font-heading font-bold text-sm mb-1">Complementary match</p>
        <p className="text-text-secondary text-sm leading-relaxed">
          Berte101 grows pollinator-friendly flowers while you focus on edibles — together your balconies create a mini ecosystem that benefits both!
        </p>
      </div>
    </div>
  )
}

function MiniCalendar({ taskDates }: { taskDates: Set<string> }) {
  // Show March 2026
  const year = 2026
  const month = 2 // 0-indexed, March
  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // Monday = 0, Sunday = 6
  const startOffset = (firstDay.getDay() + 6) % 7
  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

  const cells: (number | null)[] = Array.from({ length: startOffset }, () => null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="bg-white border-2 border-card-border rounded-xl p-4">
      <p className="font-heading font-bold text-sm mb-3 text-center">March 2026</p>
      <div className="grid grid-cols-7 gap-y-1">
        {weekdays.map((wd) => (
          <span key={wd} className="text-[10px] text-text-secondary font-medium text-center">
            {wd}
          </span>
        ))}
        {cells.map((day, i) => {
          const dateStr = day ? `2026-03-${String(day).padStart(2, "0")}` : ""
          const hasTask = day ? taskDates.has(dateStr) : false
          return (
            <div key={i} className="flex flex-col items-center py-0.5">
              <span className={`text-xs w-6 h-6 flex items-center justify-center rounded-full ${
                day ? "text-text" : ""
              }`}>
                {day ?? ""}
              </span>
              {hasTask && (
                <span className="w-1.5 h-1.5 rounded-full bg-forest -mt-0.5" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-mint/40 rounded-lg px-3 py-2">
      <p className="text-[11px] text-mint-border font-medium uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-text mt-0.5">{value}</p>
    </div>
  )
}
