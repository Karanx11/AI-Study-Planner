import express from "express"
import multer from "multer"
import Tesseract from "tesseract.js"
import Groq from "groq-sdk"
import fs from "fs"
import { createRequire } from "module"

const require = createRequire(import.meta.url)
const pdfParse = require("pdf-parse") // ✅ FIX

const router = express.Router()
const upload = multer({ dest: "uploads/" })

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

router.post("/syllabus", upload.single("file"), async (req, res) => {
  try {
    const file = req.file
    let extractedText = ""

    // 📄 PDF
    if (file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(file.path)
      const data = await pdfParse(dataBuffer)
      extractedText = data.text
    }
    // 🖼️ IMAGE
    else {
      const result = await Tesseract.recognize(file.path, "eng")
      extractedText = result.data.text
    }

    fs.unlinkSync(file.path) // cleanup uploaded file

    // 🧠 AI TOPIC EXTRACTION
const prompt = `
You are an AI syllabus analyzer.

From the syllabus text below, extract ALL study topics.
For each topic, estimate:
- difficulty: Easy | Medium | Hard
- priority: 1 (low) to 3 (high)
- recommendedHours: number

Return STRICT JSON ONLY in this format:
[
  {
    "name": "Topic Name",
    "difficulty": "Hard",
    "priority": 3,
    "recommendedHours": 5
  }
]

SYLLABUS TEXT:
${extractedText}
`


    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    })

    const aiText = completion.choices[0].message.content

    let topics
    try {
      topics = JSON.parse(aiText)
    } catch {
      throw new Error("AI returned invalid JSON")
    }

    res.json({ topics })
  } catch (err) {
    console.error("❌ Syllabus analysis error:", err)
    res.status(500).json({
      error: "Failed to analyze syllabus",
    })
  }
})

export default router
