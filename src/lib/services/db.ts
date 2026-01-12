import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface ResearchRun {
  id: string;
  subject_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  model_config_snapshot: Record<string, unknown>;
  total_cost_usd?: number;
  total_tokens?: number;
  latency_ms?: number;
  started_at?: string;
  finished_at?: string;
}

export interface ClaimRecord {
  text: string;
  category: string;
  confidenceScore?: number;
  confidenceLevel?: 'Low' | 'Med' | 'High';
}

export interface EvidenceRecord {
  url: string;
  sourceType: string;
  snippet: string;
  reputation?: number;
  hash: string;
}

/**
 * DB Persistence Helpers
 */
export async function createResearchRun(subjectId: string, config: Record<string, unknown>): Promise<ResearchRun> {
  const { data, error } = await supabase
    .from('research_runs')
    .insert({
      subject_id: subjectId,
      status: 'running',
      model_config_snapshot: config,
      started_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) throw error;
  return data as ResearchRun;
}

export async function saveClaim(runId: string, claim: ClaimRecord) {
  const { data, error } = await supabase
    .from('claims')
    .insert({
      run_id: runId,
      claim_text: claim.text,
      category: claim.category,
      confidence_level: claim.confidenceLevel || 'Med',
      confidence_score: claim.confidenceScore || 0,
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function saveEvidence(runId: string, evidence: EvidenceRecord) {
  const { data, error } = await supabase
    .from('evidence_items')
    .insert({
      run_id: runId,
      url: evidence.url,
      source_type: evidence.sourceType as any,
      snippet: evidence.snippet,
      reputation_score: evidence.reputation || 0.5,
      raw_hash: evidence.hash
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateRunStatus(runId: string, status: string, stats?: { cost: number; tokens: number; latency: number }) {
  const { error } = await supabase
    .from('research_runs')
    .update({ 
      status, 
      finished_at: status === 'completed' ? new Date().toISOString() : null,
      total_cost_usd: stats?.cost,
      total_tokens: stats?.tokens,
      latency_ms: stats?.latency
    })
    .eq('id', runId);
  
  if (error) throw error;
}
