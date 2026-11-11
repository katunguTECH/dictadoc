// src/lib/templates/index.ts

import type { Template } from "@/types/document";
import { homeCareVisitTemplate } from "./home-care-visit";

export const TEMPLATES: Template[] = [homeCareVisitTemplate];

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