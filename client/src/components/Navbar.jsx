import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      <Link
        to="/"
        className="text-lg font-bold tracking-wide text-indigo-400 hover:text-indigo-300 transition"
      >
        AI Study Planner
      </Link>

      <div className="text-sm text-gray-400">
        Student
      </div>
    </header>
  )
}
