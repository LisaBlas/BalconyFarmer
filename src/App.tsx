import { HashRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import HomePage from "./pages/HomePage"
import QuestionnairePage from "./pages/QuestionnairePage"
import LoadingPage from "./pages/LoadingPage"
import PlanPage from "./pages/PlanPage"
import CtaPage from "./pages/CtaPage"
import MapPage from "./pages/MapPage"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/cta" element={<CtaPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </HashRouter>
  )
}
