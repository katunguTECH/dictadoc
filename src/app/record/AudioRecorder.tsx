"use client";

import { useReactMediaRecorder } from "react-media-recorder";

interface AudioRecorderProps {
  onTranscription: (text: string) => void;
  onError: (message: string) => void;
  onBusyChange: (busy: boolean) => void;
}

export default function AudioRecorder({
  onTranscription,
  onError,
  onBusyChange,
}: AudioRecorderProps) {
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const isRecording = status === "recording";

  async function handleStop() {
    stopRecording();
    onBusyChange(true);

    setTimeout(async () => {
      if (!mediaBlobUrl) {
        onError("Recording was too short or empty. Please try again.");
        onBusyChange(false);
        return;
      }

      try {
        const blob = await fetch(mediaBlobUrl).then((r) => r.blob());
        const form = new FormData();
        form.append("audio", blob, "recording.webm");

        const res = await fetch("/api/transcribe", { method: "POST", body: form });
        const json = await res.json();

        if (!json.success) {
          onError(json.error.message);
          return;
        }

        onTranscription(json.data.transcript);
        clearBlobUrl();
      } catch (err) {
        onError(err instanceof Error ? err.message : "Transcription failed.");
      } finally {
        onBusyChange(false);
      }
    }, 400);
  }

  return (
    <div className="mt-2 flex items-center gap-3">
      {!isRecording ? (
        <button
          type="button"
          onClick={startRecording}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          🎙️ Start recording
        </button>
      ) : (
        <button
          type="button"
          onClick={handleStop}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          ⏹ Stop and transcribe
        </button>
      )}
      {isRecording && (
        <span className="flex items-center gap-2 text-sm text-red-600">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-600"></span>
          Recording...
        </span>
      )}
    </div>
  );
}