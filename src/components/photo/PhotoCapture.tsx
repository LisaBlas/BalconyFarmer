import { useAppStore } from "../../store/useAppStore"
import Button from "../ui/Button"

export default function PhotoCapture() {
  const photo = useAppStore((s) => s.photo)
  const setPhoto = useAppStore((s) => s.setPhoto)

  const fakeCapture = () => {
    setPhoto(`${import.meta.env.BASE_URL}images/balconybefore.jpg`)
  }

  if (photo) {
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl overflow-hidden border-2 border-text bg-black relative">
          {/* Camera-style frame */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-text/30 rounded-full" />
          <div className="absolute top-2 right-3 w-3 h-3 rounded-full border-2 border-text/30" />
          <img src={photo} alt="Your balcony" className="w-full aspect-[4/5] object-cover" />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-white/40" />
        </div>
        <button
          type="button"
          onClick={() => setPhoto(null)}
          className="text-sm text-text-secondary underline underline-offset-2"
        >
          Retake photo
        </button>
      </div>
    )
  }

  return (
    <div className="bg-mint/40 border-2 border-mint-border/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 aspect-[4/5]">
      <Button variant="primary" onClick={fakeCapture} className="text-base">
        Camera
      </Button>
      <Button variant="outline" onClick={fakeCapture} className="text-base">
        Upload
      </Button>
    </div>
  )
}
