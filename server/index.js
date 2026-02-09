import express from "express"
import cors from "cors"
import aiRoutes from "./routes/ai.js"
import uploadRoutes from "./routes/upload.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/ai", aiRoutes)
app.use("/api/upload", uploadRoutes)
const PORT = 5000
app.listen(PORT, () =>
  console.log(`🚀 AI server running on port ${PORT}`)
)
