import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 overflow-hidden">
      
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between px-8 py-6"
      >
        <h1 className="text-xl font-bold tracking-wide text-indigo-400">
          AI Study Planner
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
        >
          Get Started
        </button>
      </motion.nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 mt-24">
        
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          Study Smarter. <br />
          <span className="text-indigo-400">Ace Exams with AI.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-2xl text-gray-400 text-lg"
        >
          Personalized study plans, weakness detection, exam readiness
          prediction, and progress tracking — all powered by intelligent AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex gap-4 flex-wrap justify-center"
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-lg font-medium shadow-lg shadow-indigo-600/20"
          >
            Start Planning
          </button>

          <button
            onClick={() => navigate("/upload")}
            className="px-6 py-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition text-lg"
          >
            Upload Syllabus
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="mt-32 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {[
          {
            title: "📚 Smart Study Plans",
            desc: "AI-generated daily and weekly plans based on your syllabus, readiness level, and consistency."
          },
          {
            title: "🧠 Weakness Analysis",
            desc: "Detect weak topics automatically and prioritize high-impact areas before exams."
          },
          {
            title: "📊 Exam Readiness Predictor",
            desc: "Track completion, study streak, and performance with real-time readiness scoring."
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-600 transition"
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-3 text-gray-400">
              {feature.desc}
            </p>
          </motion.div>
        ))}

      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-32 py-6 text-center text-gray-500 text-sm"
      >
        © 2026 AI Study Planner · Built for students 🚀
      </motion.footer>
    </div>
  )
}
