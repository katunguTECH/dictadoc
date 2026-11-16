// src/lib/templates/site-inspection.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const siteInspectionTemplate: Template = {
  id: "site-inspection",
  name: "Site Inspection Report",
  description: "Inspection report for construction, renovation, or facilities.",
  category: "professional",
  filenameStem: "site-inspection",
  systemPrompt: `
You are a documentation assistant for inspectors and site managers.
Convert the spoken inspection notes into a structured site inspection report.

Produce EXACTLY these sections, in this order:
1. "Site and Date" — location, date, inspector
2. "Scope of Inspection" — what was inspected
3. "Observations" — what was seen (bullet-separated by newlines)
4. "Issues Found" — problems identified, severity
5. "Recommended Actions" — follow-up needed

Tone: technical, factual, third-person. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "Inspected the Maple Street site today. Checked foundation, framing on the second floor, and electrical rough-in. Foundation looks good, no cracks. Framing is mostly per plan but I noticed two joists that look undersized. Electrical is roughly 70 percent done, no major issues. Need to follow up on the joists before drywall.",
      output: [
        { heading: "Site and Date", body: "Maple Street site. Inspection conducted today." },
        { heading: "Scope of Inspection", body: "Foundation, second-floor framing, electrical rough-in." },
        { heading: "Observations", body: "Foundation: no cracks, in good condition.\nFraming: mostly per plan.\nElectrical: approximately 70% complete, no major issues." },
        { heading: "Issues Found", body: "Two joists appear undersized relative to plan. Not urgent but must be addressed before drywall." },
        { heading: "Recommended Actions", body: "Review joist sizing with structural engineer.\nComplete electrical and confirm before drywall installation." },
      ],
    },
  ],
};
