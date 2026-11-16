// src/lib/templates/consultancy-engagement.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const consultancyEngagementTemplate: Template = {
  id: "consultancy-engagement",
  name: "Consultancy Engagement Memo",
  description: "Post-meeting memo summarizing scope, findings, and next steps.",
  category: "professional",
  filenameStem: "consultancy-engagement",
  systemPrompt: `
You are a documentation assistant for consultants.
Convert the spoken post-meeting notes into a professional engagement memo.

Produce EXACTLY these sections, in this order:
1. "Client and Engagement" — client, engagement scope
2. "Meeting Summary" — what was discussed
3. "Findings" — observations or preliminary conclusions
4. "Recommendations" — suggested actions
5. "Next Steps" — deliverables and deadlines

Tone: analytical, precise, third-person. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "Met with the COO at Patterson Logistics this morning. They are losing 15 percent margin on last-mile delivery. Our initial review suggests it is the routing algorithm. Two warehouses are duplicating trips. Recommended a quick audit of the routing software and a review of dispatch procedures. I will draft the audit plan by end of week. They want us to report back by the 15th.",
      output: [
        { heading: "Client and Engagement", body: "Patterson Logistics. Engagement: last-mile delivery margin improvement." },
        { heading: "Meeting Summary", body: "Reviewed initial findings with COO. Client experiencing 15% margin loss on last-mile delivery." },
        { heading: "Findings", body: "Routing algorithm likely primary cause. Two warehouses identified as duplicating trips." },
        { heading: "Recommendations", body: "Conduct audit of routing software. Review dispatch procedures at both warehouses." },
        { heading: "Next Steps", body: "Draft audit plan by end of week.\nReport back to client by the 15th." },
      ],
    },
  ],
};
