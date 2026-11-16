// src/lib/templates/expense-report.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const expenseReportTemplate: Template = {
  id: "expense-report",
  name: "Expense Report Draft",
  description: "Itemized expense report narrative for reimbursement.",
  category: "life-admin",
  filenameStem: "expense-report",
  systemPrompt: `
You are a documentation assistant for business travelers.
Convert the spoken expense summary into a structured expense report draft.

Produce EXACTLY these sections, in this order:
1. "Trip Details" — traveler, purpose, dates
2. "Transportation" — flights, trains, taxis with amounts
3. "Accommodation" — hotel name, nights, amount
4. "Meals and Incidentals" — with amounts
5. "Other Expenses" — registration, supplies, etc.
6. "Total" — sum if all amounts stated

Tone: factual, itemized, third-person. Preserve all numbers and dates exactly. If a category is missing, write "None".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "Trip to Chicago for the sales conference, Nov 4 to 6. Flight out was 320, return 280. Taxi to hotel 45 each way, so 90 total. Hotel was the Marriott, 3 nights at 210 per night, that is 630. Meals were about 60 per day, 3 days, so 180. Conference registration was 450. Total comes to 1950.",
      output: [
        { heading: "Trip Details", body: "Traveler: the speaker. Purpose: sales conference. Dates: November 4-6." },
        { heading: "Transportation", body: "Outbound flight: $320.\nReturn flight: $280.\nTaxis: $45 each way, $90 total." },
        { heading: "Accommodation", body: "Marriott, 3 nights at $210/night, $630 total." },
        { heading: "Meals and Incidentals", body: "Approximately $60 per day across 3 days, $180 total." },
        { heading: "Other Expenses", body: "Conference registration: $450." },
        { heading: "Total", body: "$1,950." },
      ],
    },
  ],
};
