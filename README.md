# SignalProof 🛡️

**Replacing black-box AI predictions with verifiable, human-inspectable research.**

SignalProof is an evidence-first research teammate designed for high-stakes decisions (hiring, due diligence, investigations). It transforms messy claims into transparent "Research Packs" where every fact is hard-linked to a source and every source is weighted by a credibility graph.

## 📊 Visual Interface (SignalProof in Action)

![SignalProof Research Pack Mockup](https://raw.githubusercontent.com/datashi14/signalproof/main/docs/assets/mockup.png)

_The interface focuses on transparency: Reviewers can approve/reject evidence, inspect contradictions, and trace every summary sentence back to raw snippets via Evidence IDs [E1, E2]._

## 🔍 Case Studies: Truth vs. Simulation

SignalProof doesn't just summarize; it audits. Here is how it handled two recent real-world subjects:

### 🟢 Case Study 1: The Senior Systems Architect

**Result:** VERIFIED (Technical) / FLAGGED (Leadership)

- **The Claim:** "Architected a Zero-Trust auth system and led 50+ engineers."
- **The SSSP Audit:**
  - **Verified**: Evidence [E1] (GitHub PRs) and [E3] (CloudOps Blog) confirmed technical leadership and auth-system implementation.
  - **Contradiction**: A timestamp mismatch was found between a public blog post ("Transitioning to my first lead role...") and LinkedIn ("Been a Director for 2 years").
- **The Output**: SignalProof provided a High-Confidence rating for his code but flagged a **Timeline Conflict** for his leadership seniority, allowing the hiring manager to focus their interview on that specific gap.

### 🔴 Case Study 2: Austin Clark (@AC_Trades)

**Result:** CRITICAL FAIL (Audience Integrity) / INSUFFICIENT (P&L)

- **The Claim:** "4+ years successful trading track record."
- **The SSSP Audit:**
  - **Integrity Check**: Identified **Simulated Social Proof**. Audit found 13.9K followers but an engagement rate of only **0.35%** (verified via pinned post metrics: 6.4K views vs. 49 likes).
  - **Confidence Gap**: Zero primary evidence (MyFxBook/Brokerage statements) found. Success is entirely self-reported.
  - **Timeline Check**: Confirmed a pivot from Real Estate to Trading in late 2021, showing the "4+ years" claim overlaps with his learning/pivot phase.
- **The Output**: SignalProof downgraded his credibility to a **CRITICAL RISK**, identifying the account as an inflated persona designed to sell trading services without verified performance.

## 🔥 Key Differentiators

### 1. The Directed SSSP "Sorting Barrier"

Most research tools use linear Rerankers to order evidence. SignalProof treats evidence as a **Credibility Graph**. We use a **Directed Single Source Shortest Path (SSSP)** algorithm (Dijkstra-based) to compute the minimum-cost path from a claim to a source.

**Why SSSP Beats Sorting:**

- **Propagation of Doubt**: If a source (like a Twitter profile) is flagged for fake followers, _all_ evidence linked to it automatically carries a high "credibility cost."
- **Explainability**: We show the path: `Claim A -> Evidence B -> Source C (bot-penalty: 0.85)`.

## 🛠️ Hard Problems & Technical Tradeoffs

### The Hallucination vs. Cost Paradox

**The Problem:** Naive RAG (Retrieval-Augmented Generation) was too prone to "inventing" bridging facts.
**The Tradeoff:** We chose **Strict Atomic Synthesis**. Summaries are forbidden from using any text not explicitly found in a cited `EvidenceNode`.

## 📐 Stack & Architecture

- **Engine**: Vercel AI SDK (OpenAI & Anthropic).
- **Workflow**: Trigger.dev for reliable, long-running research tasks.
- **Analysis**: Custom Dijkstra implementation for path-cost calculation.

## 🚀 Business Impact

1. **Reduce False Positives**: Prevents "over-selling" of candidates by forcing hard links to career impact.
2. **Identify Audience Manipulation**: Flags "influencers" who use bot networks to simulate social proof.
3. **Audit Readiness**: Provides a JSON portable audit bundle for every research run.

---

Built for senior teams who value **inspectable reasoning** over autonomous black boxes.
