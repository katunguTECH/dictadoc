// src/types/document.ts

/**
 * Template categories drive the three-tab picker in the UI.
 * Keep this list stable — it's referenced by templates and UI.
 */
export const TEMPLATE_CATEGORIES = ["professional", "life-admin", "creator"] as const;
export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[number];

/**
 * A single section in a generated document.
 * The heading is the title ("Medications"), the body is the content.
 * Sections are ordered; the array order is the display order.
 */
export interface DocumentSection {
  heading: string;
  body: string;
}

/**
 * Metadata that helps users identify their document in the list view.
 * Not every field is required — templates fill in what's relevant.
 */
export interface DocumentMetadata {
  /** e.g. "Home Care Visit — Mrs. Okafor" or "Client Memo — Smith v. Jones" */
  title: string;
  /** e.g. "Home Care Visit Record" */
  templateName: string;
  /** Free-form tags for search/filtering later */
  tags?: string[];
  /** Who the document is about (patient name, client name, episode title) */
  subject?: string;
}

/**
 * What a user actually saved. This is the shape stored in the DB
 * and rendered by the document viewer + PDF exporter.
 */
export interface GeneratedDocument {
  id: string;
  userId: string;
  templateId: string;
  category: TemplateCategory;
  metadata: DocumentMetadata;
  sections: DocumentSection[];
  /** Full raw transcript — kept for audit / re-generation */
  transcript: string;
  /** ISO timestamps */
  createdAt: string;
  updatedAt: string;
  /** Optional user-edited title (overrides metadata.title in UI) */
  userTitle?: string;
  /** Letterhead / branding settings if the user uploaded one */
  branding?: {
    businessName?: string;
    logoUrl?: string;
    accentColor?: string;
  };
}

/**
 * The template definition. Every template in src/lib/templates/
 * exports an object of this shape. Adding a template = one new file
 * satisfying this interface. No changes to this file required.
 */
export interface Template {
  /** Stable kebab-case ID, e.g. "home-care-visit", "legal-client-memo" */
  id: string;
  /** Human-readable name shown in the picker */
  name: string;
  /** One-line description shown in the picker */
  description: string;
  category: TemplateCategory;
  /**
   * The system prompt sent to the LLM. Must instruct the model to
   * return JSON matching `LLMOutputSchema` below. Each template
   * writes its own prompt, tailored to its profession/use case.
   */
  systemPrompt: string;
  /**
   * Optional example transcript + example output. Used in the prompt
   * as a few-shot example. Strongly recommended — dramatically improves
   * output quality for structured documents.
   */
  examples?: Array<{
    transcript: string;
    output: DocumentSection[];
  }>;
  /** Suggested filename stem for PDF export, e.g. "home-care-visit-2026-11-11" */
  filenameStem: string;
}