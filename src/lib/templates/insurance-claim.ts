// src/lib/templates/insurance-claim.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const insuranceClaimTemplate: Template = {
  id: "insurance-claim",
  name: "Insurance Claim Draft",
  description: "Narrative claim description for submission to an insurer.",
  category: "life-admin",
  filenameStem: "insurance-claim",
  systemPrompt: `
You are a documentation assistant for policyholders.
Convert the spoken account of an incident into a clear insurance claim narrative.

Produce EXACTLY these sections, in this order:
1. "Claimant and Policy" — policyholder name, policy number if given
2. "Incident Summary" — what happened, when, where
3. "Damage or Loss" — itemized list of what was damaged
4. "Immediate Actions" — what the claimant did after the incident
5. "Supporting Evidence" — documents available

Tone: factual, chronological, first-person narrative style. Do not speculate about fault. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "My name is John Doe, policy number HL-998877. On October 3rd around 6 PM, a hailstorm hit our area. Hailstones cracked the windshield of my car and dented the hood. It also broke two windows at the front of the house. I took photos of everything that evening, filed a police report the next morning, and called my insurance company.",
      output: [
        { heading: "Claimant and Policy", body: "John Doe. Policy number HL-998877." },
        { heading: "Incident Summary", body: "On October 3rd at approximately 6:00 PM, a hailstorm occurred in the claimant area, causing damage to vehicle and property." },
        { heading: "Damage or Loss", body: "Vehicle: cracked windshield, dents on hood.\nProperty: two broken windows at front of house." },
        { heading: "Immediate Actions", body: "Photographed all damage same evening. Filed police report next morning. Contacted insurance company." },
        { heading: "Supporting Evidence", body: "Photographs of damage.\nPolice report.\nPolicy document.\nPurchase receipts." },
      ],
    },
  ],
};
