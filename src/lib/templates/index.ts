// src/lib/templates/index.ts

import type { Template } from "@/types/document";
import { homeCareVisitTemplate } from "./home-care-visit";
import { legalClientMemoTemplate } from "./legal-client-memo";
import { insuranceClaimTemplate } from "./insurance-claim";

export const TEMPLATES: Template[] = [
  homeCareVisitTemplate,
  legalClientMemoTemplate,
  insuranceClaimTemplate,
];

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getTemplatesByCategory() {
  return {
    professional: TEMPLATES.filter((t) => t.category === "professional"),
    "life-admin": TEMPLATES.filter((t) => t.category === "life-admin"),
    creator: TEMPLATES.filter((t) => t.category === "creator"),
  };
}
