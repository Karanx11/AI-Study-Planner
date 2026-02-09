import { useState, useEffect } from "react"
import AppLayout from "../components/AppLayout"
import { useSyllabus } from "../context/SyllabusContext"

// Chart.js
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

export default function Dashboard() {
  const { syllabus, setSyllabus, clearSyllabus } = useSyllabus()

  const [aiAnalysis, setAiAnalysis] = useState("")
  const [loadingAI, setLoadingAI] = useState(false)

  const [dailyPlan, setDailyPlan] = useState("")
  const [loadingPlan, setLoadingPlan] = useState(false)

  const [weeklyPlan, setWeeklyPlan] = useState("")
  const [loadingWeekly, setLoadingWeekly] = useState(false)

  const [planHistory, setPlanHistory] = useState([])

  // 🔥 REAL STUDY STREAK
  const [studyStreak, setStudyStreak] = useState(0)

  const topics = syllabus?.topics || []

  /* =========================
     LOAD PLAN HISTORY
  ========================= */
  useEffect(() => {
    const saved = localStorage.getItem("planHistory")
    if (saved) setPlanHistory(JSON.parse(saved))
  }, [])

  /* =========================
     LOAD STUDY STREAK
  ========================= */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studyStreak"))
    if (!saved) return

    const today = new Date().toDateString()
    const last = new Date(saved.lastStudyDate).toDateString()

    const diff =
      (new Date(today) - new Date(last)) / (1000 * 60 * 60 * 24)

    if (diff === 0 || diff === 1) {
      setStudyStreak(saved.streak)
    } else {
      setStudyStreak(0)
    }
  }, [])

  /* =========================
     UPDATE STREAK
  ========================= */
  const updateStreak = () => {
    const today = new Date().toDateString()
    const saved = JSON.parse(localStorage.getItem("studyStreak"))

    if (!saved) {
      localStorage.setItem(
        "studyStreak",
        JSON.stringify({ streak: 1, lastStudyDate: today })
      )
      setStudyStreak(1)
      return
    }

    const last = new Date(saved.lastStudyDate).toDateString()
    if (today === last) return

    const diff =
      (new Date(today) - new Date(last)) / (1000 * 60 * 60 * 24)

    if (diff === 1) {
      const newStreak = saved.streak + 1
      localStorage.setItem(
        "studyStreak",
        JSON.stringify({ streak: newStreak, lastStudyDate: today })
      )
      setStudyStreak(newStreak)
    } else {
      localStorage.setItem(
        "studyStreak",
        JSON.stringify({ streak: 1, lastStudyDate: today })
      )
      setStudyStreak(1)
    }
  }

  /* =========================
     SAVE PLAN HISTORY
  ========================= */
  const savePlanToHistory = (type, content) => {
    const newPlan = {
      id: Date.now(),
      type,
      subject: syllabus.subject,
      createdAt: new Date().toLocaleString(),
      content,
    }

    const updated = [newPlan, ...planHistory]
    setPlanHistory(updated)
    localStorage.setItem("planHistory", JSON.stringify(updated))
  }

  /* =========================
     READINESS LOGIC
  ========================= */
  const completedCount = topics.filter(t => t.completed).length
  const topicCompletionPercent = topics.length
    ? Math.round((completedCount / topics.length) * 100)
    : 0

  const examReadiness = Math.min(
    100,
    Math.round(topicCompletionPercent * 0.7 + (completedCount > 0 ? 30 : 0))
  )

  const readinessLabel =
    examReadiness >= 80
      ? "Exam Ready ✅"
      : examReadiness >= 50
      ? "Almost Ready ⚠️"
      : "Not Ready ❌"

  /* =========================
     TOGGLE TOPIC
  ========================= */
  const toggleTopic = (index) => {
    const updatedTopics = topics.map((topic, i) =>
      i === index ? { ...topic, completed: !topic.completed } : topic
    )

    setSyllabus({
      ...syllabus,
      topics: updatedTopics,
    })

    updateStreak()
  }

  /* =========================
     CHART DATA
  ========================= */
  const chartData = {
    labels: topics.map(t => t.name),
    datasets: [
      {
        label: "Completion",
        data: topics.map(t => (t.completed ? 100 : 0)),
        backgroundColor: topics.map(t =>
          t.completed ? "#22c55e" : "#374151"
        ),
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#e5e7eb" } },
    },
    scales: {
      y: { min: 0, max: 100 },
    },
  }

  /* =========================
     AI CALLS
  ========================= */
  const getAIReadiness = async () => {
    if (!syllabus) return
    setLoadingAI(true)
    setAiAnalysis("")

    try {
      const res = await fetch("http://localhost:5000/api/ai/readiness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: syllabus.subject,
          topics,
          readinessScore: examReadiness,
        }),
      })

      const data = await res.json()
      setAiAnalysis(data.analysis || "No AI response.")
      updateStreak()
    } catch {
      setAiAnalysis("❌ Failed to connect to AI server.")
    } finally {
      setLoadingAI(false)
    }
  }

  const getDailyPlan = async () => {
    if (!syllabus) return
    setLoadingPlan(true)
    setDailyPlan("")

    try {
      const res = await fetch("http://localhost:5000/api/ai/daily-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: syllabus.subject,
          topics,
          readinessScore: examReadiness,
        }),
      })

      const data = await res.json()
      const text = data.plan || "No daily plan."
      setDailyPlan(text)
      savePlanToHistory("daily", text)
      updateStreak()
    } catch {
      setDailyPlan("❌ Failed to generate daily plan.")
    } finally {
      setLoadingPlan(false)
    }
  }

  const getWeeklyPlan = async () => {
    if (!syllabus) return
    setLoadingWeekly(true)
    setWeeklyPlan("")

    try {
      const res = await fetch("http://localhost:5000/api/ai/weekly-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: syllabus.subject,
          topics,
          readinessScore: examReadiness,
        }),
      })

      const data = await res.json()
      const text = data.plan || "No weekly plan."
      setWeeklyPlan(text)
      savePlanToHistory("weekly", text)
      updateStreak()
    } catch {
      setWeeklyPlan("❌ Failed to generate weekly plan.")
    } finally {
      setLoadingWeekly(false)
    }
  }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">
        Track your preparation and stay exam-ready.
      </p>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl">
          <p className="text-sm text-gray-400">📚 Completion</p>
          <p className="text-3xl font-bold text-indigo-400">
            {topicCompletionPercent}%
          </p>
        </div>

        <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl">
          <p className="text-sm text-gray-400">🎯 Exam Readiness</p>
          <p className="text-3xl font-bold text-emerald-400">
            {examReadiness}%
          </p>
          <p className="text-sm text-gray-400">{readinessLabel}</p>

          <button
            onClick={getAIReadiness}
            className="mt-3 px-3 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 text-sm"
          >
            {loadingAI ? "Analyzing..." : "Get AI Analysis"}
          </button>
        </div>

        <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl">
          <p className="text-sm text-gray-400">📅 Study Streak</p>
          <p className="text-3xl font-bold text-yellow-400">
            {studyStreak} Day{studyStreak !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* DAILY + WEEKLY PLANS */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl">
          <h3 className="font-semibold mb-3">📅 AI Daily Plan</h3>
          <button
            onClick={getDailyPlan}
            className="mb-4 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
          >
            {loadingPlan ? "Generating..." : "Generate Daily Plan"}
          </button>
          {dailyPlan && (
            <pre className="whitespace-pre-wrap bg-gray-800 p-4 rounded-lg">
              {dailyPlan}
            </pre>
          )}
        </div>

        <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl">
          <h3 className="font-semibold mb-3">🗓️ AI Weekly Plan</h3>
          <button
            onClick={getWeeklyPlan}
            className="mb-4 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
          >
            {loadingWeekly ? "Generating..." : "Generate Weekly Plan"}
          </button>
          {weeklyPlan && (
            <pre className="whitespace-pre-wrap bg-gray-800 p-4 rounded-lg">
              {weeklyPlan}
            </pre>
          )}
        </div>
      </div>

      {/* TOPIC PROGRESS */}
      <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl">
        <h3 className="font-semibold mb-4">📘 Topic-wise Progress</h3>

        <Bar data={chartData} options={chartOptions} />

        <div className="mt-6 space-y-3">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="flex justify-between bg-gray-800 p-3 rounded-lg"
            >
              <span
                className={
                  topic.completed
                    ? "line-through text-green-400"
                    : ""
                }
              >
                {topic.name}
              </span>
              <button
                onClick={() => toggleTopic(index)}
                className="px-3 py-1 bg-gray-700 rounded-md text-sm"
              >
                {topic.completed ? "Done" : "Mark"}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={clearSyllabus}
          className="mt-6 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500"
        >
          Remove Syllabus
        </button>
      </div>
    </AppLayout>
  )
}
