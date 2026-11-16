// src/lib/templates/client-progress-summary.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const clientProgressSummaryTemplate: Template = {
  id: "client-progress-summary",
  name: "Client Progress Summary",
  description: "Periodic progress update for a client across multiple sessions.",
  category: "professional",
  filenameStem: "client-progress-summary",
  systemPrompt: `
You are a documentation assistant for service professionals.
Convert the spoken overview into a client progress summary.

Produce EXACTLY these sections, in this order:
1. "Client Overview" — client name, engagement period
2. "Progress to Date" — what has been achieved
3. "Ongoing Challenges" — what is still difficult
4. "Recommendations" — next-phase recommendations
5. "Timeline" — upcoming milestones if mentioned

Tone: professional, evidence-based, third-person. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "Review for the Johnson account. Started working with them in July, three months ago. They have doubled their online sales, mostly from the email work. Still struggling with social media engagement. Next quarter I would recommend focusing on TikTok or Reels - their audience is younger than I thought. Target is a 50 percent increase in engagement by end of Q1.",
      output: [
        { heading: "Client Overview", body: "Johnson account. Engagement began July (approximately 3 months to date)." },
        { heading: "Progress to Date", body: "Online sales doubled, primarily attributed to email marketing improvements." },
        { heading: "Ongoing Challenges", body: "Social media engagement remains below target." },
        { heading: "Recommendations", body: "Focus next quarter on short-form video (TikTok / Reels) to match younger audience segment." },
        { heading: "Timeline", body: "Target: 50% increase in social engagement by end of Q1." },
      ],
    },
  ],
};
