// src/app/api/generate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getTemplateById } from "@/lib/templates";
import { generateDocument, GenerationError } from "@/lib/ai/generate";

export const maxDuration = 30;

const RequestSchema = z.object({
  transcript: z.string().min(1, "Transcript is required"),
  templateId: z.string().min(1, "templateId is required"),
});

function statusForError(kind: GenerationError["kind"]): number {
  switch (kind) {
    case "empty_transcript":
    case "transcript_too_short":
      return 400;
    case "missing_api_key":
      return 401;
    case "rate_limit":
      return 429;
    default:
      return 500;
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: { kind: "invalid_request", message: "Request body must be valid JSON." } },
      { status: 400 }
    );
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: { kind: "invalid_request", message: parsed.error.issues[0]?.message ?? "Invalid request." } },
      { status: 400 }
    );
  }

  const { transcript, templateId } = parsed.data;
  const template = getTemplateById(templateId);
  if (!template) {
    return NextResponse.json(
      { success: false, error: { kind: "unknown_template", message: "Unknown templateId: " + templateId } },
      { status: 400 }
    );
  }

  try {
    const data = await generateDocument({ transcript, template });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    if (err instanceof GenerationError) {
      return NextResponse.json(
        { success: false, error: { kind: err.kind, message: err.message } },
        { status: statusForError(err.kind) }
      );
    }
    console.error("[api/generate] unexpected error:", err);
    return NextResponse.json(
      { success: false, error: { kind: "unexpected_error", message: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}