import { eventTrigger } from "@trigger.dev/sdk";
import { client } from "./trigger.config";
import { z } from "zod";
import { runAgent } from "./lib/agents/runner";
import { 
  ResearchPlanSchema, 
  ExtractedClaimsSchema, 
  ResearchOutputSchema, 
  VerificationResultSchema, 
  SynthesisSchema 
} from "./lib/agents/schemas";

// Main Research Job
client.defineJob({
  id: "research-subject-workflow",
  name: "Research Subject Workflow",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "research.start",
    schema: z.object({
      subjectId: z.string(),
      name: z.string(),
      context: z.string(),
      urls: z.array(z.string().url()).optional(),
    }),
  }),
  run: async (payload, io, ctx) => {
    // 1. Planner Phase
    const plan = await io.runTask("planner-agent", async () => {
      // In a real implementation, we'd call runAgent here
      return { status: "success", step: "planning" };
    });

    // 2. Claim Extraction
    await io.runTask("extractor-agent", async () => {
      return { status: "success", step: "extraction" };
    });

    // 3. Evidence Gathering
    await io.runTask("research-agent", async () => {
      return { status: "success", step: "gathering" };
    });

    // 4. Verification & Graph Scoring
    await io.runTask("verifier-agent", async () => {
      return { status: "success", step: "verification" };
    });

    // 5. Synthesis
    await io.runTask("synthesizer-agent", async () => {
      return { status: "success", step: "synthesis" };
    });

    return { result: "Research Pack Ready" };
  },
});
