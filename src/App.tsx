import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import QuestionnairePage from "./pages/QuestionnairePage"
import LoadingPage from "./pages/LoadingPage"
import PlanPage from "./pages/PlanPage"
import CtaPage from "./pages/CtaPage"
import MapPage from "./pages/MapPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/cta" element={<CtaPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  )
}
