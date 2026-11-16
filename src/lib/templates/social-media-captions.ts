// src/lib/templates/social-media-captions.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const socialMediaCaptionsTemplate: Template = {
  id: "social-media-captions",
  name: "Social Media Captions",
  description: "Multiple caption variations for a post across platforms.",
  category: "creator",
  filenameStem: "social-media-captions",
  systemPrompt: `
You are a documentation assistant for content creators.
Convert the spoken description of a post into multiple social media caption variations.

Produce EXACTLY these sections, in this order:
1. "Post Summary" — what the post is about in one sentence
2. "Instagram" — caption with emojis, hashtags at the end
3. "LinkedIn" — professional tone, no emojis
4. "Twitter/X" — under 280 characters, punchy
5. "TikTok" — short, casual, hook-first
6. "Hashtag Suggestions" — 10-15 hashtags

Tone: platform-appropriate. Match each platform culture. If a section is missing context, still produce a reasonable version.

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "I am posting a photo of my morning workspace with a coffee and notebook. The message is about the importance of starting the day with a clear mind and planning. I want it to feel personal and productive, not preachy.",
      output: [
        { heading: "Post Summary", body: "Morning workspace photo emphasizing clear-headed planning." },
        { heading: "Instagram", body: "A quiet morning, a full notebook, and nowhere to rush. The first 20 minutes are for thinking, not reacting. What does your ideal start look like?\n\n#morningroutine #workspace #deepfocus #mindfulproductivity #plannerlife" },
        { heading: "LinkedIn", body: "The most productive part of my day is not the meetings. It is the 20 minutes before them, with a notebook and no notifications. Planning before reacting is a habit, not a talent." },
        { heading: "Twitter/X", body: "First 20 minutes of the day: notebook, coffee, silence. No phone. The rest of the day runs smoother when the first move is intentional." },
        { heading: "TikTok", body: "The 20-minute rule that changed my mornings. No phone, just a notebook. Try it for a week." },
        { heading: "Hashtag Suggestions", body: "#morningroutine #productivity #workspace #deepfocus #mindfulproductivity #plannerlife #intentionalliving #startthedayright" },
      ],
    },
  ],
};
