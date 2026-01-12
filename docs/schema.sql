-- SignalProof: Evidence-first AI research teammate
-- Database Schema for Supabase Postgres

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Subjects: The entity being researched
create table public.subjects (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    context text, -- role, skills sought, seniority
    metadata jsonb default '{}'::jsonb, -- personal site, LinkedIn, GitHub URLs
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- 2. Research Runs: Specific execution of the workflow
create table public.research_runs (
    id uuid primary key default uuid_generate_v4(),
    subject_id uuid references public.subjects(id) on delete cascade,
    status text not null default 'pending', -- pending, running, completed, failed
    model_config_snapshot jsonb not null,
    total_cost_usd numeric(10, 5) default 0,
    total_tokens integer default 0,
    latency_ms integer default 0,
    started_at timestamp with time zone,
    finished_at timestamp with time zone,
    created_at timestamp with time zone default now()
);

-- 3. Claims: Atomic statements extracted by ClaimExtractor
create table public.claims (
    id uuid primary key default uuid_generate_v4(),
    run_id uuid references public.research_runs(id) on delete cascade,
    claim_text text not null,
    category text check (category in ('experience', 'impact', 'leadership', 'technical', 'credibility')),
    confidence_score numeric(3, 2) check (confidence_score >= 0 and confidence_score <= 1),
    confidence_level text check (confidence_level in ('Low', 'Med', 'High')),
    gaps text,
    last_verified_at timestamp with time zone,
    created_at timestamp with time zone default now()
);

-- 4. Evidence Items: Raw chunks/snippets found by Research Agent
create table public.evidence_items (
    id uuid primary key default uuid_generate_v4(),
    run_id uuid references public.research_runs(id) on delete cascade,
    url text not null,
    source_type text check (source_type in ('github', 'blog', 'linkedin', 'company_site', 'news', 'docs', 'other')),
    snippet text not null,
    extracted_at timestamp with time zone default now(),
    published_at timestamp with time zone,
    reputation_score numeric(3, 2) default 0,
    directness_score numeric(3, 2) default 0,
    recency_score numeric(3, 2) default 0,
    raw_hash text, -- for deduplication
    metadata jsonb default '{}'::jsonb,
    created_at timestamp with time zone default now()
);

-- 5. Claim-Evidence Links: Verification results
create table public.claim_evidence_links (
    id uuid primary key default uuid_generate_v4(),
    claim_id uuid references public.claims(id) on delete cascade,
    evidence_id uuid references public.evidence_items(id) on delete cascade,
    status text check (status in ('supports', 'contradicts', 'insufficient')),
    rationale text,
    created_at timestamp with time zone default now()
);

-- 6. Contradictions: Flagged disagreements
create table public.contradictions (
    id uuid primary key default uuid_generate_v4(),
    run_id uuid references public.research_runs(id) on delete cascade,
    claim_id uuid references public.claims(id),
    evidence_id uuid references public.evidence_items(id),
    type text, -- 'source_vs_source', 'claim_vs_evidence', 'timeline_mismatch'
    description text,
    created_at timestamp with time zone default now()
);

-- 7. Graph Paths (SSSP Results)
create table public.graph_paths (
    id uuid primary key default uuid_generate_v4(),
    claim_id uuid references public.claims(id) on delete cascade,
    path_data jsonb not null, -- Array of evidence IDs and path costs
    total_cost numeric(10, 5) not null,
    explanation text,
    created_at timestamp with time zone default now()
);

-- 8. Review Actions: Manual reviewer overrides
create table public.review_actions (
    id uuid primary key default uuid_generate_v4(),
    claim_id uuid references public.claims(id) on delete cascade,
    user_id uuid, -- link to Supabase Auth user
    action_type text check (action_type in ('approve', 'reject', 'needs_review')),
    comment text,
    timestamp timestamp with time zone default now()
);

-- 9. Cost Events: Observability
create table public.cost_events (
    id uuid primary key default uuid_generate_v4(),
    run_id uuid references public.research_runs(id) on delete cascade,
    agent_name text,
    model_name text,
    input_tokens integer,
    output_tokens integer,
    cost_usd numeric(10, 5),
    latency_ms integer,
    created_at timestamp with time zone default now()
);

-- 10. Evaluation Harness
create table public.eval_cases (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    subject_data jsonb not null,
    expected_claims jsonb,
    expected_contradictions jsonb,
    created_at timestamp with time zone default now()
);

create table public.eval_results (
    id uuid primary key default uuid_generate_v4(),
    case_id uuid references public.eval_cases(id) on delete cascade,
    run_id uuid references public.research_runs(id) on delete cascade,
    metrics jsonb not null, -- precision, recall, hallucination rate
    created_at timestamp with time zone default now()
);

-- Row Level Security (RLS) can be added here
alter table public.subjects enable row level security;
alter table public.research_runs enable row level security;
alter table public.claims enable row level security;
