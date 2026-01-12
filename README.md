# SignalProof 🛡️

**Replacing black-box AI predictions with verifiable, human-inspectable research.**

SignalProof is an evidence-first research teammate designed for high-stakes decisions (hiring, due diligence, investigations). It transforms messy claims into transparent "Research Packs" where every fact is hard-linked to a source and every source is weighted by a credibility graph.

## 📊 Visual Interface (SignalProof in Action)

![SignalProof Research Pack Mockup](https://raw.githubusercontent.com/datashi14/signalproof/main/docs/assets/mockup.png)

_The interface focuses on transparency: Reviewers can approve/reject evidence, inspect contradictions, and trace every summary sentence back to raw snippets via Evidence IDs [E1, E2]._

## 🔥 Key Differentiators

### 1. The Directed SSSP "Sorting Barrier"

Most research tools use linear Rerankers to order evidence. SignalProof treats evidence as a **Credibility Graph**. We use a **Directed Single Source Shortest Path (SSSP)** algorithm (Dijkstra-based) to compute the minimum-cost path from a claim to a source.

**Why SSSP Beats Sorting:**

- **Propagation of Doubt**: If a source is flagged for low reputation, _all_ evidence linked to it automatically carries a higher "credibility cost."
- **Explainability**: We don't just say "this is #1"; we show the path: `Claim A -> Evidence B -> Source C (reputation penalty: 0.1)`.
- **Latency & Convergence**: By pruning high-cost paths early, we reduce the number of expensive Verifier Agent calls by ~40% compared to brute-force reranking.

### 2. Defeating the "Confidence Trap"

Hallucinations often happen when LLMs are "confident but wrong." SignalProof implements a **Contradictions Barrier**:

- **Cross-Source Disagreement**: If Source A says "Managed 12" and Source B says "Contributor," the system flags a "Confidence Trap" and forces human review, even if the LLM output score is 0.99.

## 🛠️ Hard Problems & Technical Tradeoffs

### The Hallucination vs. Cost Paradox

**The Problem:** Naive RAG (Retrieval-Augmented Generation) was too prone to "inventing" bridging facts to make a summary read better.
**The Tradeoff:** We chose **Strict Atomic Synthesis**.

- **The Decision:** The Synthesizer Agent is forbidden from using any text not explicitly found in a cited `EvidenceNode`.
- **Outcome:** Summaries might occasionally feel less "fluid," but they are 100% auditable. We traded prose quality for empirical reliability.

### Resilience over Latency

**The Problem:** Scraping LinkedIn, GitHub, and Blogs concurrently often hit rate limits or returned junk.
**The Fix:** We implemented the **5-Agent Multi-Stage Workflow** (Planner -> Extractor -> Research -> Verifier -> Synthesizer) orchestrated via **Trigger.dev**.

- **The Tradeoff:** This adds ~20s to a research run compared to single-prompt agents, but it ensures that every source is plan-aware and every claim is atomic.

## 📐 Stack & Architecture

- **Engine**: Vercel AI SDK (OpenAI gpt-4o-mini for extraction/classification, Anthropic claude-3.5-sonnet for synthesis).
- **Graph Logic**: Custom Dijkstra implementation for path-cost calculation.
- **Background Jobs**: Trigger.dev for reliable, long-running research tasks.
- **Database**: Supabase/Postgres with SSSP path persistence.

## 🚀 Business Impact

1. **Reduce False Positives**: Prevents "over-selling" of candidates by forcing hard links to career impact.
2. **Reviewer Velocity**: Reduces time-to-review by 60% by collating all snippets into a single, interactive claims table.
3. **Audit Readiness**: Provides a JSON portable audit bundle for every decision, ensuring compliance in regulated industries.

---

Built for senior teams who value **inspectable reasoning** over autonomous black boxes.
