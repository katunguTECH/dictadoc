// src/lib/templates/home-care-visit.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const homeCareVisitTemplate: Template = {
  id: "home-care-visit",
  name: "Home Care Visit Record",
  description:
    "Turn a spoken visit summary into a structured record: patient status, medications, observations, follow-up.",
  category: "professional",
  filenameStem: "home-care-visit",

  systemPrompt: `
You are a documentation assistant for home care workers and caregivers.
You will receive a transcript of a caregiver describing a patient visit.
Your job is to convert it into a clean, professional visit record.

Produce EXACTLY these sections, in this order, with these exact headings:

1. "Patient" — the patient's name, age if mentioned, and visit date/time if stated.
2. "Visit Summary" — a 2–4 sentence professional summary of what happened during the visit.
3. "Medications" — medications administered or discussed, with dose and time if mentioned.
   If none were mentioned, write "Not specified".
4. "Observations" — physical, emotional, or environmental observations noted during the visit
   (appetite, mood, mobility, skin condition, home conditions, etc.). Use a short bulleted-style
   list separated by newlines inside the body string.
5. "Follow-up" — any actions needed before or at the next visit (refills, appointments,
   family notifications, equipment). If none were mentioned, write "Not specified".

Tone: clinical, neutral, third-person. Do not use first person ("I saw").
Do not add interpretation or advice beyond what the caregiver said.
If the caregiver's speech is informal or fragmented, translate it into clear professional language
without changing the facts.

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),

  examples: [
    {
      transcript:
        "So this was a visit with Mrs. Okafor, she's 78, this was Tuesday morning around 9. She was in good spirits today, ate most of her breakfast which is better than last week. I gave her the metformin 500 milligrams with breakfast like the chart says. Her blood pressure was 138 over 84, bit high but she said she was rushing to the bathroom before I came. No swelling in her ankles this time. She mentioned her knee has been bothering her more, especially on stairs. I told her I'd let the family know. She's almost out of her lisinopril, maybe two days left. Next visit is Thursday.",
      output: [
        {
          heading: "Patient",
          body: "Mrs. Okafor, age 78. Visit on Tuesday morning at approximately 9:00 AM.",
        },
        {
          heading: "Visit Summary",
          body: "Routine morning visit. Patient was in good spirits and ate most of her breakfast, an improvement over the previous week. Blood pressure reading was elevated but patient reported rushing to the bathroom prior to the visit. No ankle swelling observed. Patient reported increased knee pain, particularly on stairs.",
        },
        {
          heading: "Medications",
          body: "Metformin 500 mg administered with breakfast as prescribed. Lisinopril supply is nearly depleted — approximately 2 days remaining.",
        },
        {
          heading: "Observations",
          body: "Appetite: improved, ate most of breakfast.\nMood: good spirits.\nBlood pressure: 138/84 (patient reported rushing beforehand).\nEdema: none observed in ankles.\nMobility: reported increased knee pain, especially on stairs.",
        },
        {
          heading: "Follow-up",
          body: "Notify family of increased knee pain.\nLisinopril refill needed before next visit (approx. 2 days remaining).\nNext visit scheduled for Thursday.",
        },
      ],
    },
  ],
};