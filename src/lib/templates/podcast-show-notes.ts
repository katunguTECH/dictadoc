// src/lib/templates/podcast-show-notes.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const podcastShowNotesTemplate: Template = {
  id: "podcast-show-notes",
  name: "Podcast Show Notes",
  description: "Show notes with summary, timestamps, and links for a podcast episode.",
  category: "creator",
  filenameStem: "podcast-show-notes",
  systemPrompt: `
You are a documentation assistant for podcasters.
Convert the spoken episode summary into publishable show notes.

Produce EXACTLY these sections, in this order:
1. "Episode Title" — a compelling title
2. "Episode Summary" — 3-5 sentence summary
3. "Key Takeaways" — 3-5 bullet points
4. "Timestamps" — approximate timestamps for major topics, if mentioned
5. "Links and Mentions" — any people, books, tools mentioned

Tone: engaging, clear, third-person. Make the title catchy. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "This episode was with Dr. Sarah Chen about sleep and productivity. She explained that most people need 7 to 9 hours and that consistency matters more than total. She talked about her book The Sleep Advantage around the 20 minute mark. Around 35 minutes she shared her morning routine - no phone for 30 minutes. The episode wraps around 50 minutes with her advice for shift workers. Mention her website sleepyadvantage.com.",
      output: [
        { heading: "Episode Title", body: "The Sleep Advantage: Why Consistency Beats Quantity" },
        { heading: "Episode Summary", body: "Dr. Sarah Chen joins us to discuss the science of sleep and its impact on productivity. We cover how much sleep most people actually need, why consistency matters more than total hours, and practical routines from her book." },
        { heading: "Key Takeaways", body: "Most adults need 7 to 9 hours of sleep.\nConsistency of sleep schedule outperforms total duration.\nDelaying phone use by 30 minutes after waking improves morning clarity.\nShift workers benefit from consistent anchor sleep windows." },
        { heading: "Timestamps", body: "00:20 — Sleep fundamentals and why consistency matters.\n35:00 — Dr. Chen morning routine.\n50:00 — Advice for shift workers." },
        { heading: "Links and Mentions", body: "Book: The Sleep Advantage.\nGuest website: sleepyadvantage.com.\nGuest: Dr. Sarah Chen." },
      ],
    },
  ],
};
