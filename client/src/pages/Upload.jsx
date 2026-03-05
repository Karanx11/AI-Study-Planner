import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSyllabus } from "../context/SyllabusContext"

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000"

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
      const res = await fetch(`${API_BASE}/api/upload/syllabus`, {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      const topics = data.topics.map((t) => ({
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">

      {/* Main Card */}
      <div className="w-full max-w-md border border-gray-700 rounded-2xl p-8 bg-white/5 backdrop-blur-lg shadow-xl">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          Upload Your Syllabus
        </h2>

        {/* Upload Box */}
        <div className="border border-gray-600 rounded-lg p-6 text-center mb-6 hover:border-indigo-500 transition">
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-sm"
          />

          {file && (
            <p className="mt-3 text-green-400 text-sm">
              Selected: {file.name}
            </p>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full border border-indigo-500 bg-indigo-600 py-3 rounded-lg font-medium hover:bg-indigo-500 transition"
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>

      </div>
    </div>
  )
}