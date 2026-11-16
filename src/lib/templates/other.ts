// src/lib/templates/other.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const otherTemplate: Template = {
  id: "other",
  name: "Other — Describe your own document",
  description: "Any document type not in the list. You describe what you need, and the AI structures it.",
  category: "creator",
  filenameStem: "document",
  systemPrompt: `
You are a general documentation assistant.
The user will describe a document they need, and provide a transcript of the content.
Your job is to determine the appropriate structure and produce a clean, useful document.

CRITICAL: The user message will start with a line describing what kind of document they want.
Read that description first. Then use the transcript to produce a document that matches that description.

Choose 3 to 7 sections that make sense for the requested document type.
For example:
- A "resignation letter" should have: Recipient, Subject, Body, Closing, Signature line.
- A "meeting minutes" should have: Meeting Details, Attendees, Discussion Points, Decisions, Action Items.
- A "birthday toast" should have: Opening, Story or Memory, Warm Closing.
- A "product return request" should have: Order Details, Reason for Return, Requested Resolution, Closing.

Do not use generic headings like "Section 1" or "Part A".
Each heading should be specific to the document type.
If the user does not describe a document type, default to a professional summary structure.

Tone: match what is appropriate for the document type described.
If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
};
