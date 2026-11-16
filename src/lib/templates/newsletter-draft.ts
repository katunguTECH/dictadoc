// src/lib/templates/newsletter-draft.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const newsletterDraftTemplate: Template = {
  id: "newsletter-draft",
  name: "Newsletter Draft",
  description: "Draft newsletter from spoken ideas and structure.",
  category: "creator",
  filenameStem: "newsletter-draft",
  systemPrompt: `
You are a documentation assistant for newsletter writers.
Convert the spoken ideas into a structured newsletter draft.

Produce EXACTLY these sections, in this order:
1. "Subject Line" — compelling email subject, under 60 characters
2. "Preview Text" — under 100 characters, complements the subject
3. "Opening" — 2-3 sentences that hook the reader
4. "Main Content" — the body paragraphs, organized logically with line breaks
5. "Call to Action" — what the reader should do
6. "Sign-off" — closing and signature line

Tone: match the voice described by the writer (professional, casual, witty, etc.). If voice is not described, use a warm professional tone. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "Newsletter for my freelance clients. Want to talk about how I raised my rates last year and how it went. Opened with how scared I was. Main point: three things helped - telling existing clients first, having a waitlist, and not apologizing. Ended with a nudge for them to consider their own rate reviews. Personal, honest tone. Sign off as always, Alex.",
      output: [
        { heading: "Subject Line", body: "I raised my rates. Here is what happened." },
        { heading: "Preview Text", body: "Three things that made it easier than I expected." },
        { heading: "Opening", body: "Last year I did something I had been putting off for months: I raised my rates. I was terrified. Here is what actually happened." },
        { heading: "Main Content", body: "Three things made the biggest difference.\n\nFirst, I told my existing clients before I told anyone else. They deserved to hear it from me directly, and most of them said yes without blinking.\n\nSecond, I had a waitlist. Knowing there were people ready to work with me made the decision feel less like a gamble and more like an obvious step.\n\nThird, I stopped apologizing. No long explanations. No discounts for discomfort. Just a clear note about the new rate and what it covers." },
        { heading: "Call to Action", body: "If you have been sitting on a rate review, this is your sign. Reply and tell me what is holding you back. I read every response." },
        { heading: "Sign-off", body: "Talk soon,\nAlex" },
      ],
    },
  ],
};
