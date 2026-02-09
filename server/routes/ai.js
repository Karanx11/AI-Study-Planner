import express from "express"
import Groq from "groq-sdk"
import dotenv from "dotenv"

dotenv.config()

const router = express.Router()

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

/* =========================
   AI READINESS ANALYSIS
========================= */
router.post("/readiness", async (req, res) => {
  try {
    console.log("🔥 /readiness hit", req.body)

    const { subject, topics, readinessScore } = req.body

    const topicSummary = topics
      .map(t => `- ${t.name}: ${t.completed ? "Completed" : "Pending"}`)
      .join("\n")

    const prompt = `
You are an AI study coach.

Subject: ${subject}
Readiness score: ${readinessScore}%

Topics:
${topicSummary}

Explain readiness, weak areas, and next steps.
`

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    })

    res.json({
      analysis: completion.choices[0].message.content,
    })
  } catch (err) {
    console.error("❌ AI readiness error:", err)
    res.status(500).json({
      analysis: "AI analysis failed. Please try again.",
    })
  }
})

/* =========================
   AI DAILY STUDY PLAN
========================= */
router.post("/daily-plan", async (req, res) => {
  try {
    console.log("🔥 /daily-plan hit", req.body)

    const { subject, topics, readinessScore } = req.body

    const topicSummary = topics
      .map(t => `- ${t.name}: ${t.completed ? "Completed" : "Pending"}`)
      .join("\n")

    const prompt = `
You are an AI study planner.

Subject: ${subject}
Readiness score: ${readinessScore}%

Topics:
${topicSummary}

Create a 2-hour DAILY study plan with bullet points.
`

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    })

    res.json({
      plan: completion.choices[0].message.content,
    })
  } catch (err) {
    console.error("❌ Daily plan error:", err)
    res.status(500).json({
      plan: "Failed to generate daily plan. Try again.",
    })
  }
})

/* =========================
   AI WEEKLY STUDY PLAN
========================= */
router.post("/weekly-plan", async (req, res) => {
  try {
    console.log("🔥 /weekly-plan hit", req.body)

    const { subject, topics, readinessScore } = req.body

    const topicSummary = topics
      .map(t => `- ${t.name}: ${t.completed ? "Completed" : "Pending"}`)
      .join("\n")

    const prompt = `
You are an AI study planner.

Subject: ${subject}
Exam readiness: ${readinessScore}%

Topics:
${topicSummary}

Create a 7-DAY WEEKLY STUDY PLAN:
- 2–3 hours per day
- Focus more on pending topics
- Include revision days
- Simple bullet format
- Label days (Monday to Sunday)
`

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    })

    res.json({
      plan: completion.choices[0].message.content,
    })
  } catch (err) {
    console.error("❌ Weekly plan error:", err)
    res.status(500).json({
      plan: "Failed to generate weekly plan.",
    })
  }
})

export default router
