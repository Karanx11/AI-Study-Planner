import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import Upload from "./pages/Upload"
import { SyllabusProvider } from "./context/SyllabusContext"

export default function App() {
  return (
    <SyllabusProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </SyllabusProvider>
  )
}
