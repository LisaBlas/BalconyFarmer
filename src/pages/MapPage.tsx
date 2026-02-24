import { useEffect, useRef, useState } from "react"
import Logo from "../components/layout/Logo"
import plantsData from "../data/plants.json"

const markers = plantsData.gardenMarkers

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapReady, setMapReady] = useState(false)
  const [selected, setSelected] = useState<typeof markers[0] | null>(markers[0] ?? null)
  const leafletMarkersRef = useRef<{ marker: L.Marker; data: typeof markers[0] }[]>([])
  const leafletRef = useRef<typeof import("leaflet") | null>(null)

  useEffect(() => {
    let map: L.Map | null = null

    async function init() {
      const L = await import("leaflet")
      await import("leaflet/dist/leaflet.css")
      leafletRef.current = L

      if (!mapRef.current) return

      map = L.map(mapRef.current).setView([52.512, 13.39], 14)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map)

      const defaultIcon = L.divIcon({
        className: "",
        html: `<div style="width:28px;height:28px;background:#6BAF73;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      })

      const selectedIcon = L.divIcon({
        className: "",
        html: `<div style="width:32px;height:32px;background:#C8F540;border:3px solid #1A1A1A;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      leafletMarkersRef.current = markers.map((m) => {
        const isFirst = m === markers[0]
        const leafletMarker = L.marker([m.lat, m.lng], { icon: isFirst ? selectedIcon : defaultIcon })
          .addTo(map!)
          .on("click", () => setSelected(m))
        return { marker: leafletMarker, data: m }
      })

      setMapReady(true)
    }

    init()

    return () => {
      map?.remove()
    }
  }, [])

  useEffect(() => {
    const L = leafletRef.current
    if (!L || !mapReady) return

    const defaultIcon = L.divIcon({
      className: "",
      html: `<div style="width:28px;height:28px;background:#6BAF73;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    })

    const selectedIcon = L.divIcon({
      className: "",
      html: `<div style="width:32px;height:32px;background:#C8F540;border:3px solid #1A1A1A;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    })

    leafletMarkersRef.current.forEach(({ marker, data }) => {
      marker.setIcon(selected && data.lat === selected.lat && data.lng === selected.lng ? selectedIcon : defaultIcon)
    })
  }, [selected, mapReady])

  return (
    <div className="min-h-dvh bg-cream flex flex-col">
      <header className="px-6 pt-5 pb-4">
        <Logo />
      </header>

      <main className="flex-1 px-6 pb-6 flex flex-col">
        <h1 className="font-heading text-[28px] font-bold leading-tight mb-2">
          Explore balconies
          <br />
          in your hood!
        </h1>
        <p className="text-text-secondary text-sm leading-relaxed mb-5">
          Look around for inspiration. With an account you can contact other farmers directly!
        </p>

        {/* Map */}
        <div className="flex-1 min-h-[350px] rounded-2xl overflow-hidden border-2 border-card-border relative">
          <div ref={mapRef} className="w-full h-full min-h-[350px]" />
          {!mapReady && (
            <div className="absolute inset-0 bg-cream flex items-center justify-center">
              <p className="text-text-secondary text-sm">Loading map...</p>
            </div>
          )}
        </div>

        {/* Selected marker — overlaps map */}
        {selected && (
          <div className="-mt-16 relative z-[500] bg-white border-2 border-card-border rounded-2xl overflow-hidden shadow-lg">
            <GardenCarousel gardenId={selected.id} />
            <div className="p-5 pt-3">
              <h3 className="font-heading font-bold text-base mb-1">{selected.title}</h3>
              <p className="text-mint-border text-sm font-medium mb-2">@{selected.username}</p>
              <p className="text-text-secondary text-sm leading-relaxed">{selected.description}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

const gardenColors: Record<string, string[]> = {
  "garden-1": ["#6BAF73", "#8BC99A", "#A3D9B1"],
  "garden-2": ["#D4A5E5", "#C8F540", "#6BAF73"],
  "garden-3": ["#F5A840", "#E87C5D", "#6BAF73"],
  "garden-4": ["#E85D75", "#C8F540", "#8BC99A"],
  "garden-5": ["#5DB8E8", "#A3D9B1", "#C8F540"],
}

function GardenCarousel({ gardenId }: { gardenId: string }) {
  const [active, setActive] = useState(0)
  const colors = gardenColors[gardenId] ?? gardenColors["garden-1"]

  useEffect(() => {
    setActive(0)
  }, [gardenId])

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % 3)
    }, 2000)
    return () => clearInterval(timer)
  }, [gardenId])

  return (
    <div className="relative">
      <div className="w-full h-36 flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: colors[active] }}>
        <span className="text-4xl">
          {active === 0 ? "🌱" : active === 1 ? "🌿" : "🌻"}
        </span>
      </div>
      {/* Navigation dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {[0, 1, 2].map((i) => (
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
