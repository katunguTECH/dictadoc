// src/lib/templates/coaching-session.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const coachingSessionTemplate: Template = {
  id: "coaching-session",
  name: "Coaching Session Notes",
  description: "Session notes: observations, insights, action items for the client.",
  category: "professional",
  filenameStem: "coaching-session",
  systemPrompt: `
You are a documentation assistant for coaches and consultants.
Convert the spoken post-session notes into structured session notes.

Produce EXACTLY these sections, in this order:
1. "Session Context" — client, session date, focus
2. "Key Themes" — main themes that came up
3. "Observations" — coach observations of client state/progress
4. "Action Items" — agreed actions for the client before next session
5. "Next Session Focus" — planned focus for next session

Tone: supportive, professional, third-person. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "Had a 45-minute session with Sarah today. Main theme was procrastination on the business plan. She realized she is waiting for perfection. I pointed out this is the third session we have touched this. She committed to a rough draft by next Tuesday, no editing allowed. Next session we will review it. She seemed energized at the end.",
      output: [
        { heading: "Session Context", body: "Client: Sarah. 45-minute session. Focus: procrastination on business plan." },
        { heading: "Key Themes", body: "Perfectionism blocking progress. Recurring pattern across sessions." },
        { heading: "Observations", body: "Client showed increased self-awareness. Recognized pattern of waiting for perfect conditions. Ended session with visible energy and commitment." },
        { heading: "Action Items", body: "Write rough draft of business plan by next Tuesday. No editing allowed during draft phase." },
        { heading: "Next Session Focus", body: "Review draft, discuss next steps in refinement process." },
      ],
    },
  ],
};
