import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Brain,
  Upload,
  BarChart3,
  Target,
  Sparkles,
  BookOpen,
} from "lucide-react"

export default function Landing() {
  const navigate = useNavigate()

  const features = [
    {
      icon: <Brain size={28} />,
      title: "AI Smart Planning",
      desc: "Generate personalized study roadmaps based on syllabus, goals, and exam timelines.",
    },
    {
      icon: <Target size={28} />,
      title: "Weakness Detection",
      desc: "Identify weak subjects automatically and focus on the topics that matter most.",
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Progress Tracking",
      desc: "Visualize your consistency, completion rate, and overall exam readiness score.",
    },
    {
      icon: <Upload size={28} />,
      title: "Syllabus Upload",
      desc: "Upload your syllabus or notes and let AI organize everything instantly.",
    },
    {
      icon: <BookOpen size={28} />,
      title: "Daily Study Goals",
      desc: "Get structured daily tasks and maintain a productive study streak effortlessly.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "AI Recommendations",
      desc: "Receive intelligent suggestions for revision, practice, and improvement.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/10 backdrop-blur-md"
      >
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-indigo-500">AI</span> Study Planner
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/upload")}
            className="hidden md:block px-5 py-2 rounded-lg border border-gray-700 hover:border-indigo-500 hover:bg-gray-900 transition"
          >
            Upload
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
          >
            Get Started
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 md:pt-32">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-6 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm"
        >
          🚀 AI Powered Academic Success Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight max-w-5xl"
        >
          Plan Smarter. <br />
          Study Better. <br />
          <span className="text-indigo-500">
            Crack Exams with AI.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-3xl text-gray-400 text-lg md:text-xl leading-relaxed"
        >
          Your all-in-one AI-powered study assistant for creating smart study
          plans, analyzing weak topics, tracking progress, and improving exam
          performance with intelligent recommendations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-5 justify-center"
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition text-lg font-semibold shadow-xl shadow-indigo-600/30"
          >
            Start Planning
          </button>

          <button
            onClick={() => navigate("/upload")}
            className="px-8 py-4 rounded-2xl border border-gray-700 hover:border-indigo-500 hover:bg-gray-900 transition text-lg"
          >
            Upload Syllabus
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 w-full max-w-5xl"
        >
          {[
            { value: "95%", label: "Study Efficiency" },
            { value: "24/7", label: "AI Assistance" },
            { value: "100+", label: "Topics Managed" },
            { value: "10x", label: "Better Planning" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <h2 className="text-3xl font-bold text-indigo-400">
                {item.value}
              </h2>
              <p className="mt-2 text-gray-400 text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="mt-32 px-6 md:px-12 max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold">
            Powerful Features for Students
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage your studies, improve consistency,
            and maximize exam performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-3xl bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 hover:border-indigo-500 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 mb-6 group-hover:scale-110 transition">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-36 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center p-12 rounded-[32px] bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-white/10 backdrop-blur-xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Ready to transform your study routine?
          </h2>

          <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
            Join the next generation of students using AI to stay productive,
            focused, and exam-ready every single day.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-10 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition text-lg font-semibold shadow-xl shadow-indigo-600/30"
          >
            Launch Dashboard
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-32 border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        © 2026 AI Study Planner · Designed for modern students 🚀
      </footer>
    </div>
  )
}