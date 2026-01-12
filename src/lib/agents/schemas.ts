import { z } from "zod";

/**
 * Shared Types
 */
export const EvidenceCategorySchema = z.enum([
  "experience",
  "impact",
  "leadership",
  "technical",
  "credibility",
]);

export const SourceTypeSchema = z.enum([
  "github",
  "blog",
  "linkedin",
  "company_site",
  "news",
  "docs",
  "other",
]);

/**
 * 1. Planner Agent
 * Input: subject + context
 * Output: research plan
 */
export const ResearchPlanSchema = z.object({
  subjectName: z.string(),
  sourcesToQuery: z.array(
    z.object({
      url: z.string().url().optional(),
      type: SourceTypeSchema,
      priority: z.number().int().min(1).max(10),
      intent: z
        .string()
        .describe("Specific goal for this source (e.g., 'Verify tenure at X')"),
    })
  ),
  constraints: z.array(z.string()),
  focusAreas: z.array(EvidenceCategorySchema),
});

/**
 * 2. Claim Extractor Agent
 * Input: subject raw text (resume/LinkedIn/GitHub readme)
 * Output: list of atomic claims
 */
export const ClaimSchema = z.object({
  text: z.string().describe("Atomic, specific claim"),
  category: EvidenceCategorySchema,
  expectedEvidenceTypes: z
    .array(z.string())
    .describe("Types of documents likely to prove this"),
});

export const ExtractedClaimsSchema = z.object({
  claims: z.array(ClaimSchema),
});

/**
 * 3. Research Agent
 * Input: plan items + claims
 * Output: evidence candidates
 */
export const EvidenceCandidateSchema = z.object({
  url: z.string().url(),
  sourceType: SourceTypeSchema,
  snippet: z.string().describe("Direct excerpt from the source"),
  publishedAt: z.string().datetime().nullable(),
  metadata: z.record(z.any()),
});

export const ResearchOutputSchema = z.object({
  evidenceCandidates: z.array(EvidenceCandidateSchema),
});

/**
 * 4. Verifier Agent
 * Input: claim + evidence candidates
 * Output: support/contradict/insufficient
 */
export const VerificationResultSchema = z.object({
  status: z.enum(["supports", "contradicts", "insufficient"]),
  rationale: z.string().describe("Rationale referencing evidence IDs only"),
  evidenceIds: z
    .array(z.string())
    .describe("List of linked evidence snippet hashes or IDs"),
  confidence: z.number().min(0).max(1),
});

/**
 * 5. Synthesiser Agent
 * Input: verified claims + reviewer overrides
 * Output: final summary + risk flags
 */
export const SynthesisSchema = z.object({
  summary: z
    .string()
    .describe(
      "Transparent summary with inline citations [E1], [E2]. NO NEW FACTS."
    ),
  riskFlags: z.array(
    z.object({
      type: z.string(),
      description: z.string(),
      severity: z.enum(["low", "med", "high"]),
    })
  ),
  uncertaintyNotes: z.array(z.string()),
  manualVerificationSteps: z
    .array(z.string())
    .describe("What a human should check next"),
});
