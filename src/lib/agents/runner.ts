import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

export type ModelComplexity = 'cheap' | 'strong' | 'open';

interface AgentRunnerOptions<T extends z.ZodType> {
  name: string;
  complexity: ModelComplexity;
  schema: T;
  prompt: string;
  system: string;
}

export interface AgentResult<T> {
  data: T;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  cost: number;
  latency: number;
}

// Pricing per 1k tokens (example rates)
const PRICING = {
  cheap: { input: 0.0005, output: 0.0015 }, // e.g. gpt-4o-mini
  strong: { input: 0.01, output: 0.03 },    // e.g. claude-3-5-sonnet
  open: { input: 0.0002, output: 0.0002 }    // e.g. llama3
};

/**
 * AgentRunner: Executes structured output tasks with routing, tracking, and validation.
 */
export async function runAgent<T extends z.ZodType>({
  name,
  complexity,
  schema,
  prompt,
  system
}: AgentRunnerOptions<T>): Promise<AgentResult<z.infer<T>>> {
  const start = Date.now();

  // Model Selection Logic (Requirement 6.3)
  const model = complexity === 'strong' 
    ? anthropic('claude-3-5-sonnet-20240620')
    : openai('gpt-4o-mini');

  try {
    const { object, usage } = await generateObject({
      model,
      schema,
      prompt,
      system,
    });

    const latency = Date.now() - start;
    
    // Calculate estimated cost
    const rate = PRICING[complexity];
    const cost = (usage.promptTokens / 1000 * rate.input) + (usage.completionTokens / 1000 * rate.output);

    return {
      data: object,
      usage,
      cost,
      latency
    };
  } catch (error) {
    console.error(`Agent [${name}] failed:`, error);
    throw error;
  }
}
