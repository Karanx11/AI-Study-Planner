import { createContext, useContext, useEffect, useState } from "react"

const SyllabusContext = createContext()

export function SyllabusProvider({ children }) {
  const [syllabus, setSyllabus] = useState(null)

  // Load syllabus from localStorage on app start
  useEffect(() => {
    const savedSyllabus = localStorage.getItem("syllabus")
    if (savedSyllabus) {
      setSyllabus(JSON.parse(savedSyllabus))
    }
  }, [])

  // Save or clear syllabus in localStorage when it changes
  useEffect(() => {
    if (syllabus) {
      localStorage.setItem("syllabus", JSON.stringify(syllabus))
    } else {
      localStorage.removeItem("syllabus")
    }
  }, [syllabus])

  // Clear syllabus manually
  const clearSyllabus = () => {
    setSyllabus(null)
  }

  return (
    <SyllabusContext.Provider
      value={{ syllabus, setSyllabus, clearSyllabus }}
    >
      {children}
    </SyllabusContext.Provider>
  )
}

// Custom hook
export function useSyllabus() {
  return useContext(SyllabusContext)
}
