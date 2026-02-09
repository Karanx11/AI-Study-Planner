import { useNavigate } from "react-router-dom"

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-xl font-bold tracking-wide">
          AI Study Planner
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 mt-24">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Study Smarter. <br />
          <span className="text-indigo-400">Ace Exams with AI.</span>
        </h2>

        <p className="mt-6 max-w-2xl text-gray-400 text-lg">
          Personalized study plans, weakness detection, and exam readiness
          prediction — all powered by AI.
        </p>

        <div className="mt-10 flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-lg font-medium"
          >
            Start Planning
          </button>

          <button
            onClick={() => navigate("/upload")}
            className="px-6 py-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition text-lg"
          >
            See Features
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-32 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-600 transition">
          <h3 className="text-xl font-semibold">📚 Smart Study Plans</h3>
          <p className="mt-3 text-gray-400">
            AI-generated daily and weekly plans based on your syllabus and time availability.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-600 transition">
          <h3 className="text-xl font-semibold">🧠 Weakness Analysis</h3>
          <p className="mt-3 text-gray-400">
            Identify weak topics using quizzes, accuracy tracking, and AI insights.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-600 transition">
          <h3 className="text-xl font-semibold">📊 Exam Readiness Predictor</h3>
          <p className="mt-3 text-gray-400">
            Predict how ready you are for exams with confidence scores and trends.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 py-6 text-center text-gray-500 text-sm">
        © 2026 AI Study Planner · Built for students 🚀
      </footer>
    </div>
  )
}
