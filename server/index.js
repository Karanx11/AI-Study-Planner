import express from "express"
import cors from "cors"

import aiRoutes from "./routes/ai.js"
import uploadRoutes from "./routes/upload.js"

const app = express()

// ------------------ MIDDLEWARE ------------------
app.use(cors({
  origin: "*", // Later you can restrict to your Vercel URL
}))
app.use(express.json())

// ------------------ API ROUTES ------------------
app.use("/api/ai", aiRoutes)
app.use("/api/upload", uploadRoutes)

// ------------------ HEALTH CHECK ------------------
app.get("/", (req, res) => {
  res.json({ message: "AI Study Planner API is running 🚀" })
})

// ------------------ START SERVER ------------------
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 AI Study Planner running on port ${PORT}`)
})
