// src/lib/templates/complaint-letter.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const complaintLetterTemplate: Template = {
  id: "complaint-letter",
  name: "Complaint Letter",
  description: "Formal letter of complaint to a company or service provider.",
  category: "life-admin",
  filenameStem: "complaint-letter",
  systemPrompt: `
You are a documentation assistant for consumers.
Convert the spoken account into a formal complaint letter to a company.

Produce EXACTLY these sections, in this order:
1. "Recipient" — company name, department if mentioned
2. "Subject" — one-line subject
3. "Background" — what was purchased, when, reference numbers
4. "The Issue" — what went wrong, chronologically
5. "Previous Contact" — any prior attempts to resolve
6. "Requested Resolution" — what the consumer wants
7. "Closing" — polite closing with contact preference

Tone: formal, factual, polite but firm, first-person from the complainant. Do not use threatening language. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "I bought a fridge from Bluestone Appliances on October 15th. Order number 884711. It stopped cooling on October 28th. I called customer service on the 29th, they said someone would come out within 5 days. Nobody came. I called again on Nov 5th, was told it was escalated. Still nothing. The food in the fridge spoiled, that is about 200 dollars of groceries. I want a working fridge or a refund, and I want the 200 dollars for the food. I prefer they call me, my number is on file.",
      output: [
        { heading: "Recipient", body: "Bluestone Appliances" },
        { heading: "Subject", body: "Non-functional refrigerator and unfulfilled service commitment (Order 884711)" },
        { heading: "Background", body: "Purchased a refrigerator on October 15th. Order number 884711." },
        { heading: "The Issue", body: "Appliance stopped cooling on October 28th. Reported to customer service on October 29th, was promised service within 5 days. No service visit occurred. Called again November 5th, was told issue was escalated. No resolution to date. Approximately $200 of groceries spoiled." },
        { heading: "Previous Contact", body: "Phone call October 29th (first report).\nPhone call November 5th (escalation requested)." },
        { heading: "Requested Resolution", body: "Either repair or replacement of the refrigerator, or a full refund. Reimbursement of approximately $200 for spoiled food." },
        { heading: "Closing", body: "Please respond by phone. Contact number is on file with the account." },
      ],
    },
  ],
};
