import { Link, useLocation } from "react-router-dom"

export default function Sidebar() {
  const location = useLocation()

  const linkClass = (path) =>
    `block px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`

  return (
    <aside className="w-60 bg-gray-900 border-r border-gray-800 p-4">
      <nav className="space-y-2">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          📊 Dashboard
        </Link>
        <Link to="/upload" className={linkClass("/upload")}>
          📚 Upload Syllabus
        </Link>
      </nav>
    </aside>
  )
}
