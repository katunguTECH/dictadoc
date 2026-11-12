// src/lib/templates/legal-client-memo.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const legalClientMemoTemplate: Template = {
  id: "legal-client-memo",
  name: "Legal Client Memo",
  description: "Formal client memo: case facts, key points discussed, next steps.",
  category: "professional",
  filenameStem: "legal-client-memo",
  systemPrompt: `
You are a documentation assistant for lawyers and paralegals.
Convert the spoken case notes into a formal client memo.

Produce EXACTLY these sections, in this order:
1. "Client and Matter" — client name, matter description
2. "Case Facts" — key facts as understood
3. "Discussion" — key points raised during the call/meeting
4. "Next Steps" — actions agreed, deadlines, who is responsible
5. "Fees Note" — any billing or fee arrangement mentioned

Tone: formal, precise, third-person. Do not give legal advice. Only record what was discussed. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "Spoke with Mr. Smith today about the property dispute with his neighbor over the fence line. He says the fence has been in the same position for 20 years and the neighbor just moved in last year. He's got photos going back to 2015. I advised him to get the old property survey. He'll send it over by Friday. We agreed to review once received.",
      output: [
        { heading: "Client and Matter", body: "Mr. Smith. Property boundary dispute regarding fence line with adjacent neighbor." },
        { heading: "Case Facts", body: "Fence has allegedly been in same position for approximately 20 years. Neighbor acquired their property approximately one year ago. Client has photographic evidence dating back to 2015." },
        { heading: "Discussion", body: "Discussed burden of proof and historical use. Advised client to obtain historical property survey to establish boundary." },
        { heading: "Next Steps", body: "Client to provide prior property survey by Friday.\nAttorney to review on receipt and prepare boundary analysis." },
        { heading: "Fees Note", body: "Not specified." },
      ],
    },
  ],
};
