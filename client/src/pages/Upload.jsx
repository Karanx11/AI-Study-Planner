import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSyllabus } from "../context/SyllabusContext"

export default function Upload() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const { setSyllabus } = useSyllabus()
  const navigate = useNavigate()

  const handleUpload = async () => {
    if (!file) return alert("Upload syllabus file")

    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload/syllabus", {

        method: "POST",
        body: formData,
      })

      const data = await res.json()

     const topics = data.topics.map(t => ({
  name: t.name,
  completed: false,
  difficulty: t.difficulty,
  priority: t.priority,
  recommendedHours: t.recommendedHours,
}))


      setSyllabus({
        subject: file.name,
        uploadedAt: new Date().toLocaleString(),
        topics,
      })

      navigate("/dashboard")
    } catch {
      alert("Failed to analyze syllabus")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h2 className="text-2xl mb-6">Upload Syllabus (PDF / Image)</h2>

      <input
        type="file"
        accept=".pdf,image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="px-6 py-3 bg-indigo-600 rounded-lg"
      >
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>
    </div>
  )
}
