import { TriggerClient, eventTrigger } from "@trigger.dev/sdk";
import { z } from "zod";
import { runAgent } from "./lib/agents/runner";
import { 
  ResearchPlanSchema, 
  ExtractedClaimsSchema, 
  SynthesisSchema 
} from "./lib/agents/schemas";

// In V2/V3, this is the standard way. If V4 changed it, we'll see.
const client = new TriggerClient({ id: "signalproof" });

export const researchJob = client.defineJob({
  id: "research-workflow",
  name: "SignalProof Research Workflow",
  version: "1.0.0",
  trigger: eventTrigger({
    name: "research.start",
    schema: z.object({
      subjectId: z.string(),
      name: z.string(),
      context: z.string(),
    }),
  }),
  run: async (payload, io) => {
    // Pipeline logic
    await io.runTask("planning", async () => {
      return await runAgent({
        name: "Planner",
        complexity: "cheap",
        schema: ResearchPlanSchema,
        system: "Head of Research system prompt",
        prompt: `Plan research for ${payload.name}`
      });
    });

    await io.runTask("extraction", async () => {
       return await runAgent({
        name: "Extractor",
        complexity: "cheap",
        schema: ExtractedClaimsSchema,
        system: "Extractor system prompt",
        prompt: `Extract claims for ${payload.name}`
      });
    });

    return { status: "completed" };
  },
});
