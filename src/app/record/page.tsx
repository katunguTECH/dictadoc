"use client";

import { useState } from "react";
import { TEMPLATES } from "@/lib/templates";
import type { LLMOutput } from "@/types/llm-output";

type GenerateResponse =
  | { success: true; data: LLMOutput }
  | { success: false; error: { kind: string; message: string } };

export default function RecordPage() {
  const [transcript, setTranscript] = useState("");
  const [templateId, setTemplateId] = useState(TEMPLATES[0]?.id ?? "");
  const [result, setResult] = useState<LLMOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, templateId }),
      });

      const json: GenerateResponse = await res.json();

      if (!json.success) {
        setError(json.error.message);
        return;
      }

      setResult(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const canGenerate = transcript.trim().length >= 20 && !loading;

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">DictaDoc</h1>
      <p className="mt-1 text-sm text-gray-600">
        Speak once, get the document you need.
      </p>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">
          Document type
        </label>
        <select
          value={templateId}
          onChange={(e) => setTemplateId(e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
        >
          {TEMPLATES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Transcript
        </label>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={8}
          placeholder="Paste or type the transcript here. In a later version, this will be filled by voice recording."
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
        />
        <p className="mt-1 text-xs text-gray-500">
          {transcript.trim().length} characters (min 20)
        </p>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!canGenerate}
        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {loading ? "Generating..." : "Generate document"}
      </button>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {result.metadata.title}
          </h2>
          {result.metadata.subject && (
            <p className="text-sm text-gray-600">{result.metadata.subject}</p>
          )}
          <div className="mt-4 space-y-4">
            {result.sections.map((section, i) => (
              <div key={i}>
                <h3 className="text-sm font-semibold text-gray-800">
                  {section.heading}
                </h3>
                <p className="mt-1 whitespace-pre-line text-sm text-gray-700">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
