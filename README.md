# SignalProof 🛡️

**Evidence-first AI research teammate that turns messy claims into transparent, reviewable research packs.**

SignalProof ensures no unverifiable claims ever reach your final report. By linking every conclusion to hard evidence and computing credibility paths using graph theory, it keeps humans in control while accelerating deep research.

## ✨ Key Features

- **Evidence-First Engine**: Extracts atomic claims and verifies them against snippets found across the web.
- **5-Agent System**: Structured workflows using Planner, Extractor, Research, Verifier, and Synthesiser agents.
- **SSSP Credibility Graph**: Uses a Directed Single Source Shortest Path (SSSP) algorithm to compute the "cost of truth" for every claim.
- **Trigger.dev Workflows**: Background research jobs that don't block the UI, with real-time status updates.
- **Evaluation Harness**: Non-negotiable precision/recall testing against high-quality datasets.
- **Transparent Synthesis**: Summaries that cite every fact with an Evidence ID—no hallucinations allowed.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Lucide Icons.
- **AI Engine**: Vercel AI SDK (OpenAI & Anthropic), Zod for structured output validation.
- **Workflow**: Trigger.dev for background job orchestration.
- **Storage**: Supabase (Postgres with UUIDs and JSONB for graph/cost tracking).
- **Observability**: Built-in cost and latency tracking per agent run.

## 📐 Architecture: The Research Lifecycle

1. **Planner Agent**: Maps out the research strategy based on subject and context.
2. **Claim Extractor**: Breaks down resumes, bios, or raw text into atomic, testable claims.
3. **Research Agent**: Scours sources (GitHub, LinkedIn, Blogs, News) for snippets.
4. **Verifier Agent**: Supports/Contradicts claims using extracted evidence.
5. **SSSP Scorer**: Computes the shortest (most credible) path from Claim → Evidence → Source.
6. **Synthesiser Agent**: Compiles the final Research Pack with human-readable uncertainty notes.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Supabase Account
- Trigger.dev Account
- OpenAI/Anthropic API Keys

### Installation

```bash
# Clone the repository
git clone https://github.com/datashi14/signalproof.git
cd signalproof

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### Running the App

```bash
# Start the development server
npm run dev

# Start Trigger.dev worker
npx @trigger.dev/cli@latest dev
```

### Evaluation

```bash
# Run the quality assessment suite
npm run eval
```

## 📊 Database Schema

The database is built on Supabase/Postgres. See `docs/schema.sql` for the full table definitions including:

- `research_runs`: Tracking costs and latency.
- `claims`: Atomic research findings.
- `graph_paths`: SSSP results for credibility scoring.

## ⚖️ Security

- **PII Management**: Minimal data retention by design.
- **Prompt Injection Defense**: Tool instructions are stripped from retrieved text.
- **Transparency**: Full audit logs for every reviewer decision.

---

Built with ❤️ by SignalProof Labs.
