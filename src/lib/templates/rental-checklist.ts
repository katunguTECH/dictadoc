// src/lib/templates/rental-checklist.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const rentalChecklistTemplate: Template = {
  id: "rental-checklist",
  name: "Rental Move-In / Move-Out Checklist",
  description: "Room-by-room condition log with timestamps for deposit protection.",
  category: "life-admin",
  filenameStem: "rental-checklist",
  systemPrompt: `
You are a documentation assistant for tenants and landlords.
Convert the spoken walkthrough notes into a room-by-room rental condition checklist.

Produce EXACTLY these sections, in this order:
1. "Property Details" — address, tenant name, date, move-in or move-out
2. "Overall Condition" — general summary
3. "Room-by-Room" — one entry per room, bullet-separated by newline
4. "Existing Damage" — pre-existing issues with location
5. "Meter Readings" — if mentioned (gas, electric, water)

Tone: factual, thorough, third-person. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "Move-in inspection at 42 Birch Lane, tenant is Maria Santos, today is Nov 12. Kitchen: cabinets fine, fridge has a scratch on the lower door, stove works. Living room: walls good, small nail hole above the sofa. Bedroom: closet door sticks, carpet clean. Bathroom: grout in shower needs attention, toilet runs a little. Meter readings: gas 1234, electric 5678.",
      output: [
        { heading: "Property Details", body: "42 Birch Lane. Tenant: Maria Santos. Move-in inspection on November 12." },
        { heading: "Overall Condition", body: "Property generally in good condition with minor pre-existing wear." },
        { heading: "Room-by-Room", body: "Kitchen: cabinets fine, fridge lower door scratched, stove functional.\nLiving room: walls good, small nail hole above sofa.\nBedroom: closet door sticks, carpet clean.\nBathroom: shower grout needs attention, toilet runs slightly." },
        { heading: "Existing Damage", body: "Scratch on fridge lower door.\nNail hole above living room sofa.\nSticking closet door in bedroom.\nShower grout issue.\nRunning toilet." },
        { heading: "Meter Readings", body: "Gas: 1234. Electric: 5678." },
      ],
    },
  ],
};
