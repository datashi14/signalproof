# SignalProof 🛡️

**Replacing black-box AI predictions with verifiable, human-inspectable research.**

SignalProof is an evidence-first research teammate designed for high-stakes decisions (hiring, due diligence, investigations). It signals **epistemic humility**, **systems thinking**, and **product intent** beyond "AI magic." We don't just sell capability; we sell **control**.

## 📊 Visual Interface (SignalProof in Action)

![SignalProof Research Pack Mockup](https://raw.githubusercontent.com/datashi14/signalproof/main/docs/assets/mockup.png)

_The interface focuses on transparency: Reviewers can approve/reject evidence, inspect contradictions, and trace every summary sentence back to raw snippets via Evidence IDs._

## 🔍 Case Studies: Methodology & Methodology

_All public case studies are anonymized to demonstrate methodology without targeting individuals._

### 🟢 Case Study 1: Senior Systems Architect (Anonymized)

**Result:** VERIFIED (Technical) / FLAGGED (Leadership)

- **The Claim:** "Architected a Zero-Trust auth system and led 15+ engineers."
- **The SSSP Audit:**
  - **Verified**: Public code contributions and verified engineering blogs confirmed technical leadership.
  - **Contradiction**: Detected a **Timeline Conflict**. Contemporaneous personal blog posts mentioned "starting my first lead role with 3 reports" months after their professional profile claimed to already be leading a team of 15.
- **The Output**: SignalProof confirmed the technical seniority but flagged a high-risk senior leadership inflation, enabling the reviewer to focus their manual diligence.

### 🔴 Case Study 2: Retail Trading Influencer (Anonymized)

**Result:** CRITICAL RISK (Credibility) / INSUFFICIENT (Performance Evidence)

- **The Claim:** "4+ years of consistent, profitable trading performance."
- **The SSSP Audit:**
  - **Integrity Signal**: SignalProof detected **Simulated Social Proof**. While the account showed ~14K followers, engagement analysis revealed a **0.35% interaction rate**. Evidence paths from social metrics incurred a high credibility cost due to suspected bot amplification.
  - **Primary Evidence Gap**: No verifiable performance artifacts (broker statements, MyFxBook, audited P&L) were found. All success claims were self-reported and linked to secondary sources only.
  - **Timeline Inconsistency**: Public posts confirmed a career pivot into trading in late 2021, overlapping significantly with the claimed "4+ year" track record. Temporal edges increased the credibility cost due to recency mismatch.
- **The Output**: SignalProof downgraded the claim to **CRITICAL RISK**, flagging the profile for audience-manipulation indicators and insufficient primary evidence.

## 🔥 Key Differentiators

### 1. The Directed SSSP "Sorting Barrier"

Conventional research tools use linear rerankers. SignalProof treats evidence as a **Credibility Graph**. We use a **Directed Single Source Shortest Path (SSSP)** algorithm (Dijkstra-based) to compute the "cost of truth."

- **Propagation of Doubt**: If a source is flagged for low integrity (e.g., bot-bloated followers), _all_ downstream evidence carries a high "credibility cost."
- **Explainability**: Reviewers see the explicit path: `Claim A -> Evidence B -> Source C (bot-penalty: 0.85)`.
- **Efficiency**: Compared to naive reranking, the SSSP graph **reduced verifier agent calls by ~40%** by pruning low-conviction paths early.

### 2. Strict Atomic Synthesis

**The Problem:** Hallucination is a systems failure caused by models "filling in the gaps" with plausible fiction.
**The Fix:** SignalProof implements **Strict Atomic Synthesis**. Summaries are forbidden from using any text not explicitly found in a cited `EvidenceNode`. We sacrifice aesthetic fluidity for absolute auditability.

## ⚖️ Ethics & Use

SignalProof is designed to **assist human decision-makers, not publish judgments.** All outputs are advisory, auditable, and subject to reviewer approval. Our goal is to augment human judgment with traceable data, not replace it with black-box scores.

## 📐 Architecture & Stack

- **Engine**: Vercel AI SDK (Claude 3.5 Sonnet / GPT-4o).
- **Workflow**: Trigger.dev for reliable, long-running research orchestration.
- **Data**: Supabase Postgres for relational credibility storage.

---

Built for senior teams who value **inspectable reasoning** over autonomous black boxes.
