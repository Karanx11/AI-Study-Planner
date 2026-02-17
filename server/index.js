import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

import aiRoutes from "./routes/ai.js"
import uploadRoutes from "./routes/upload.js"

const app = express()

// ------------------ MIDDLEWARE ------------------
app.use(cors())
app.use(express.json())

// ------------------ API ROUTES ------------------
app.use("/api/ai", aiRoutes)
app.use("/api/upload", uploadRoutes)

// ------------------ SERVE FRONTEND ------------------
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "../client/dist")))

// SPA fallback (Node 22 safe)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
})

// ------------------ START SERVER ------------------
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 AI Study Planner running on port ${PORT}`)
})
