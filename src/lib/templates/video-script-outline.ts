// src/lib/templates/video-script-outline.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const videoScriptOutlineTemplate: Template = {
  id: "video-script-outline",
  name: "Video Script Outline",
  description: "Structured outline for a video script from a spoken concept.",
  category: "creator",
  filenameStem: "video-script-outline",
  systemPrompt: `
You are a documentation assistant for video creators.
Convert the spoken concept into a structured video script outline.

Produce EXACTLY these sections, in this order:
1. "Working Title" — 2-3 title options, clickable
2. "Target Length" — estimated duration and format (short-form, tutorial, long-form, etc.)
3. "Hook" — the first 5-10 seconds, designed to stop the scroll
4. "Structure" — main beats in order with a short description of each
5. "Key Talking Points" — 3-5 points that must be covered
6. "Call to Action" — what the viewer should do at the end
7. "B-Roll and Visuals" — suggested visuals or b-roll shots

Tone: energetic, clear, script-ready. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "Video about morning routines for people who hate morning routines. 8 to 10 minutes for YouTube. I want to push back on the 5 AM thing. Main points - most successful people do not wake at 5, the 5 AM narrative is survivorship bias, what actually matters is consistency not time, and give a simple 3-step routine that anyone can do. End by asking viewers to share their own routine in the comments.",
      output: [
        { heading: "Working Title", body: "1. Why the 5 AM Routine Is a Lie\n2. You Do Not Need to Wake Up at 5 AM\n3. The Only Morning Routine That Actually Works" },
        { heading: "Target Length", body: "8-10 minutes, long-form YouTube tutorial with commentary." },
        { heading: "Hook", body: "Open with a direct challenge: Every morning routine video tells you to wake up at 5 AM. Here is why that advice is setting you up to fail." },
        { heading: "Structure", body: "1. Cold open — the 5 AM myth (0:00-0:30).\n2. Why the 5 AM narrative exists — survivorship bias explained (0:30-2:00).\n3. What actually matters — consistency over clock time (2:00-4:00).\n4. The 3-step routine anyone can do (4:00-7:00).\n5. Common objections and how to handle them (7:00-8:30).\n6. Close with CTA (8:30-9:00)." },
        { heading: "Key Talking Points", body: "Most successful people do not actually wake at 5 AM.\nThe 5 AM narrative is survivorship bias — you only hear from the people it worked for.\nConsistency of routine matters more than the specific time you wake.\nA simple 3-step routine (hydration, light, one meaningful task) is enough." },
        { heading: "Call to Action", body: "Ask viewers to share their own morning routine in the comments, and to subscribe if they want more myth-busting videos." },
        { heading: "B-Roll and Visuals", body: "Stock footage of 5 AM alarm clocks and dark bedrooms.\nCut to a relaxed morning scene with natural light.\nOn-screen text for the 3-step routine.\nSimple chart showing survivorship bias." },
      ],
    },
  ],
};
