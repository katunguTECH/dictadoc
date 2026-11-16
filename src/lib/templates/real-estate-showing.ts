// src/lib/templates/real-estate-showing.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const realEstateShowingTemplate: Template = {
  id: "real-estate-showing",
  name: "Real Estate Showing Report",
  description: "Post-showing report: property condition, client feedback, follow-up.",
  category: "professional",
  filenameStem: "real-estate-showing",
  systemPrompt: `
You are a documentation assistant for real estate agents.
Convert the spoken post-showing notes into a structured showing report.

Produce EXACTLY these sections, in this order:
1. "Property and Client" — address, client name, showing date
2. "Property Condition" — overall condition, anything noteworthy
3. "Client Feedback" — positive points, concerns, objections
4. "Comparison" — how it compared to other properties if mentioned
5. "Follow-up" — next actions

Tone: professional, third-person. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "Showed the Oak Street property to the Patels today at 3. House was clean, new kitchen from 2020, but the backyard is small. They liked the light and the school district. Concerned about the roof age - looks like original from 2005. I will pull the inspection report. They want to see one more place before deciding. I will send them the Hillcrest listing tomorrow.",
      output: [
        { heading: "Property and Client", body: "Oak Street property. Clients: Mr. and Mrs. Patel. Showing at 3:00 PM." },
        { heading: "Property Condition", body: "Clean. Kitchen renovated 2020. Small backyard. Roof appears original from 2005." },
        { heading: "Client Feedback", body: "Positive: natural light, school district.\nConcerns: small backyard, roof age." },
        { heading: "Comparison", body: "Clients wish to see at least one more property before deciding." },
        { heading: "Follow-up", body: "Pull and send inspection report regarding roof.\nSend Hillcrest listing tomorrow." },
      ],
    },
  ],
};
