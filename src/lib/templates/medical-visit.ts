// src/lib/templates/medical-visit.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const medicalVisitTemplate: Template = {
  id: "medical-visit",
  name: "Medical Visit Record",
  description: "Record of a medical appointment for personal or family records.",
  category: "life-admin",
  filenameStem: "medical-visit",
  systemPrompt: `
You are a documentation assistant for patients and family caregivers.
Convert the spoken notes into a structured medical visit record.

Produce EXACTLY these sections, in this order:
1. "Visit Details" — patient, doctor or clinic, date
2. "Reason for Visit" — chief complaint or purpose
3. "What Was Discussed" — key points from the doctor
4. "Medications" — prescribed, changed, or discontinued
5. "Action Items" — tests, appointments, things to monitor

Tone: factual, third-person, non-diagnostic. Never add medical advice not stated by the doctor. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "Took Mom to see Dr. Chen today. She had been having dizziness for about a week. Dr. Chen checked her blood pressure - it was 158 over 92, higher than last time. She thinks the new blood pressure medication might not be strong enough. She is increasing the dose of amlodipine from 5 to 10 mg. Mom should check her BP twice a day and write it down. Next appointment in two weeks. No new tests needed for now.",
      output: [
        { heading: "Visit Details", body: "Patient: mother of the speaker. Doctor: Dr. Chen. Visit date: today." },
        { heading: "Reason for Visit", body: "Dizziness persisting for approximately one week." },
        { heading: "What Was Discussed", body: "Blood pressure reading 158/92, higher than previous. Doctor suspects current medication insufficient." },
        { heading: "Medications", body: "Amlodipine dose increased from 5 mg to 10 mg." },
        { heading: "Action Items", body: "Patient to check blood pressure twice daily and record readings.\nFollow-up appointment in two weeks." },
      ],
    },
  ],
};
