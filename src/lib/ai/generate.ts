// src/lib/ai/generate.ts

import OpenAI from "openai";
import type { Template } from "@/types/document";
import {
  LLMOutputSchema,
  type LLMOutput,
  SHARED_JSON_INSTRUCTIONS,
} from "@/types/llm-output";

export class GenerationError extends Error {
  constructor(
    public readonly kind:
      | "empty_transcript"
      | "transcript_too_short"
      | "api_error"
      | "rate_limit"
      | "invalid_json"
      | "schema_mismatch"
      | "missing_api_key",
    message: string,
  ) {
    super(message);
    this.name = "GenerationError";
  }
}

function buildMockOutput(template: Template, transcript: string): LLMOutput {
  return {
    metadata: {
      title: `Mock ${template.name} — ${new Date().toISOString().slice(0, 10)}`,
      subject: "Mock Subject",
      tags: ["mock", template.id],
    },
    sections: [
      {
        heading: "Mock Section 1",
        body: `This is a mock response for template "${template.id}". Transcript preview: ${transcript.slice(0, 80)}${transcript.length > 80 ? "..." : ""}`,
      },
      {
        heading: "Mock Section 2",
        body: "Replace MOCK_AI=true with a real OPENAI_API_KEY in .env.local to see live generation.",
      },
    ],
  };
}

function buildMessages(
  template: Template,
  transcript: string,
): OpenAI.Chat.ChatCompletionMessageParam[] {
  const parts: string[] = [];

  if (template.examples && template.examples.length > 0) {
    parts.push("Here is an example of the expected output format:\n");
    for (const ex of template.examples) {
      parts.push(
        `EXAMPLE TRANSCRIPT:\n${ex.transcript}\n\nEXAMPLE OUTPUT:\n${JSON.stringify({ metadata: { title: "Example" }, sections: ex.output }, null, 2)}\n`,
      );
    }
    parts.push("---\nNow process the following transcript.\n");
  }

  parts.push(`TRANSCRIPT:\n\n${transcript}`);

  return [
    { role: "system", content: template.systemPrompt },
    { role: "user", content: parts.join("\n") },
  ];
}

async function callOnce(
  client: OpenAI,
  template: Template,
  transcript: string,
  stricter: boolean,
): Promise<LLMOutput> {
  const messages = buildMessages(template, transcript);

  if (stricter) {
    messages[0] = {
      role: "system",
      content: `${template.systemPrompt}\n\nIMPORTANT: Your previous response was not valid JSON or did not match the schema. Return ONLY valid JSON. No prose. No markdown fences. Start your response with { and end with }.`,
    };
  }

  let completion: OpenAI.Chat.ChatCompletion;
  try {
    completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.2,
      response_format: { type: "json_object" },
    });
  } catch (err) {
    const e = err as { status?: number; message?: string };
    if (e.status === 429) {
      throw new GenerationError("rate_limit", "The AI service is rate-limited. Please retry in a moment.");
    }
    throw new GenerationError("api_error", e.message ?? "The AI service returned an unexpected error.");
  }

  const raw = completion.choices[0]?.message?.content;
  if (!raw) {
    throw new GenerationError("invalid_json", "The AI returned an empty response.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new GenerationError("invalid_json", "The AI response was not valid JSON.");
  }

  const validated = LLMOutputSchema.safeParse(parsed);
  if (!validated.success) {
    throw new GenerationError("schema_mismatch", "The AI response did not match the expected document structure.");
  }

  return validated.data;
}

export async function generateDocument(params: {
  transcript: string;
  template: Template;
}): Promise<LLMOutput> {
  const { transcript, template } = params;

  if (!transcript || transcript.trim().length === 0) {
    throw new GenerationError("empty_transcript", "The transcript is empty.");
  }

  if (transcript.trim().length < 20) {
    throw new GenerationError("transcript_too_short", "The transcript is too short to generate a useful document.");
  }

  if (process.env.MOCK_AI === "true") {
    await new Promise((r) => setTimeout(r, 1500));
    return buildMockOutput(template, transcript);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.startsWith("sk-your-key")) {
    throw new GenerationError("missing_api_key", "OPENAI_API_KEY is not configured. Set it in .env.local or set MOCK_AI=true.");
  }

  const client = new OpenAI({ apiKey });

  try {
    return await callOnce(client, template, transcript, false);
  } catch (err) {
    if (err instanceof GenerationError && err.kind === "invalid_json") {
      return await callOnce(client, template, transcript, true);
    }
    throw err;
  }
}
