// src/types/llm-output.ts

import { z } from "zod";

/**
 * The exact shape we ask the LLM to return for every template.
 * The prompt in each template tells the model to produce this.
 * If the model returns anything else, generation fails at the
 * API boundary and the user sees a clean error — not a corrupt doc.
 */
export const LLMOutputSchema = z.object({
  metadata: z.object({
    title: z.string().min(1).max(200),
    subject: z.string().max(200).optional(),
    tags: z.array(z.string().max(40)).max(10).optional(),
  }),
  sections: z
    .array(
      z.object({
        heading: z.string().min(1).max(100),
        body: z.string().min(1).max(8000),
      }),
    )
    .min(1)
    .max(20),
});

export type LLMOutput = z.infer<typeof LLMOutputSchema>;

/**
 * Shared instructions appended to every template's systemPrompt.
 * Keeps the JSON contract consistent without duplicating it
 * in every template file.
 */
export const SHARED_JSON_INSTRUCTIONS = `
You must return ONLY valid JSON matching this exact schema — no prose,
no markdown fences, no explanation:

{
  "metadata": {
    "title": "string (short, descriptive, includes subject name if relevant)",
    "subject": "string (optional, name of person/entity the doc is about)",
    "tags": ["string (optional, max 10, each max 40 chars)"]
  },
  "sections": [
    { "heading": "string", "body": "string" }
  ]
}

Rules:
- "sections" must contain at least 1 and at most 20 items.
- Each "heading" must be short (max 100 chars).
- Each "body" must be plain text (no markdown), max 8000 chars.
- Use the transcript provided by the user as your only source of truth.
- Do not invent facts not present in the transcript.
- If information for a section is missing, write "Not specified" in the body.
`.trim();