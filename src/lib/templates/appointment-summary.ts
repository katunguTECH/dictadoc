// src/lib/templates/appointment-summary.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const appointmentSummaryTemplate: Template = {
  id: "appointment-summary",
  name: "Appointment Summary",
  description: "Summary of any professional appointment for personal records.",
  category: "life-admin",
  filenameStem: "appointment-summary",
  systemPrompt: `
You are a documentation assistant for consumers tracking their appointments.
Convert the spoken notes into a structured appointment summary.

Produce EXACTLY these sections, in this order:
1. "Appointment" — provider, date, location if stated
2. "Purpose" — why the appointment was made
3. "What Was Discussed" — key points
4. "Decisions Made" — any decisions or agreements
5. "Next Steps" — follow-up appointments or actions

Tone: factual, third-person. This template is generic — works for doctors, lawyers, accountants, consultants. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "Met with my accountant today, Rachel Kim, about the quarterly taxes. She said I need to set aside more for Q4 because my income went up. Also she flagged that I am missing receipts for September travel. She is going to file the extension. I need to send her the missing receipts by end of month, and schedule a call in early December to plan year-end.",
      output: [
        { heading: "Appointment", body: "Accountant Rachel Kim. Purpose: quarterly tax review." },
        { heading: "Purpose", body: "Review quarterly tax situation and prepare for Q4." },
        { heading: "What Was Discussed", body: "Q4 tax set-aside should be increased due to higher income. September travel receipts are missing." },
        { heading: "Decisions Made", body: "Accountant will file an extension." },
        { heading: "Next Steps", body: "Send missing September travel receipts by end of month.\nSchedule year-end planning call for early December." },
      ],
    },
  ],
};
