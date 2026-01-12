# SignalProof Implementation Plan

Tagline: Evidence-first AI research teammate that turns messy claims into transparent, reviewable research packs.

## Phase 1: Foundation & Project Setup

- [ ] Initialize Next.js project with TypeScript and Tailwind CSS
- [ ] Configure Supabase (Auth, Postgres, Storage)
- [ ] Establish directory structure for Agents, Services, and UI components
- [ ] Create `docs/schema.sql` for database initialization

## Phase 2: Agent Architecture & Core Schemas

- [ ] Define Zod schemas for all Agent inputs and outputs (Planner, Extractor, Research, Verifier, Synthesizer)
- [ ] Implement `AgentRunner` module for structured model routing and cost tracking
- [ ] Create basic evaluation harness for agent performance validation

## Phase 3: Research Logic & Graph Scoring

- [ ] Implement `ClaimExtractor` and `EvidenceCollector` services
- [ ] Build the Directed SSSP (Single Source Shortest Path) Graph Scorer for evidence credibility
- [ ] Integrate Trigger.dev for background research workflows

## Phase 4: Frontend Development (Research Pack)

- [ ] Build Subject Search and Workflow Trigger UI
- [ ] Implement real-time progress updates (SSE or WebSockets)
- [ ] Create the "Research Pack" page:
  - Claims Table
  - Evidence Library
  - Contradictions Panel
  - Summary for Humans

## Phase 5: Reviewer Controls & Export

- [ ] Implement Reviewer dashboard for approving/rejecting claims
- [ ] Build Export service (PDF, Markdown, JSON)
- [ ] Implement Admin dashboards for cost/latency monitoring

## Phase 6: Quality Assurance & Deployment

- [ ] Finalize Eval Harness with 20 test subjects
- [ ] Security audit (Prompt injection, PII management)
- [ ] Deploy to Vercel
