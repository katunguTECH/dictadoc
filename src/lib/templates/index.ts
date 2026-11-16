// src/lib/templates/index.ts

import type { Template } from "@/types/document";
import { homeCareVisitTemplate } from "./home-care-visit";
import { legalClientMemoTemplate } from "./legal-client-memo";
import { insuranceClaimTemplate } from "./insurance-claim";
import { realEstateShowingTemplate } from "./real-estate-showing";
import { coachingSessionTemplate } from "./coaching-session";
import { clientProgressSummaryTemplate } from "./client-progress-summary";
import { consultancyEngagementTemplate } from "./consultancy-engagement";
import { siteInspectionTemplate } from "./site-inspection";
import { rentalChecklistTemplate } from "./rental-checklist";
import { medicalVisitTemplate } from "./medical-visit";
import { expenseReportTemplate } from "./expense-report";

export const TEMPLATES: Template[] = [
  homeCareVisitTemplate,
  legalClientMemoTemplate,
  insuranceClaimTemplate,
  realEstateShowingTemplate,
  coachingSessionTemplate,
  clientProgressSummaryTemplate,
  consultancyEngagementTemplate,
  siteInspectionTemplate,
  rentalChecklistTemplate,
  medicalVisitTemplate,
  expenseReportTemplate,
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
