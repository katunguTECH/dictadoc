// src/app/api/transcribe/route.ts

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const maxDuration = 60;

const MAX_BYTES = 25 * 1024 * 1024; // Whisper hard limit

export async function POST(req: NextRequest) {
  // 1. Check API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.startsWith("sk-your-key")) {
    return NextResponse.json(
      { success: false, error: { kind: "missing_api_key", message: "OPENAI_API_KEY not configured." } },
      { status: 401 }
    );
  }

  // 2. Read the uploaded audio file
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { success: false, error: { kind: "invalid_request", message: "Expected multipart/form-data with an 'audio' field." } },
      { status: 400 }
    );
  }

  const file = form.get("audio");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { success: false, error: { kind: "invalid_request", message: "Missing 'audio' file field." } },
      { status: 400 }
    );
  }

  if (file.size === 0) {
    return NextResponse.json(
      { success: false, error: { kind: "empty_audio", message: "The audio file is empty." } },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { success: false, error: { kind: "audio_too_large", message: "Audio file exceeds 25 MB. Please record a shorter clip." } },
      { status: 413 }
    );
  }

  // 3. Determine filename from MIME type so Whisper parses it correctly
  const mime = file.type || "audio/webm";
  const ext = mime.includes("mp4") ? "mp4"
    : mime.includes("mpeg") ? "mp3"
    : mime.includes("wav") ? "wav"
    : mime.includes("ogg") ? "ogg"
    : "webm";
  const filename = `audio.${ext}`;

  // 4. Call Whisper
  try {
    const client = new OpenAI({ apiKey });
    const transcription = await client.audio.transcriptions.create({
      file: new File([await file.arrayBuffer()], filename, { type: mime }),
      model: "whisper-1",
      response_format: "json",
    });

    return NextResponse.json({
      success: true,
      data: { transcript: transcription.text },
    });
  } catch (err) {
    const e = err as { status?: number; message?: string };
    if (e.status === 429) {
      return NextResponse.json(
        { success: false, error: { kind: "rate_limit", message: "The AI service is rate-limited. Please retry in a moment." } },
        { status: 429 }
      );
    }
    console.error("[api/transcribe] unexpected error:", err);
    return NextResponse.json(
      { success: false, error: { kind: "transcription_failed", message: e.message ?? "Transcription failed." } },
      { status: 500 }
    );
  }
}
