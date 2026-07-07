<div align="center">
  <img src="https://i.imgur.com/kK53zHn.png" alt="Awoken" width="120" />
  <h1>Awoken</h1>
  <p><strong>Private AI Intelligence Platform for Startup Founders</strong></p>
  <p>Stop guessing what to build. Awoken continuously monitors the internet for founder complaints, manual workarounds, and feature requests, transforming raw noise into scored, validated startup opportunities.</p>

  <p>
    <a href="#features">Features</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#quickstart">Quickstart</a> •
    <a href="#data-sources">Data Sources</a>
  </p>
</div>

---

## 🧠 Why Awoken?

Finding a good startup idea is hard. Reading thousands of Hacker News comments, GitHub issues, and Twitter threads to find genuine user pain is impossible. 

**Awoken acts as your 24/7 AI Analyst:**
1. **Scrapes** public forums (Hacker News, GitHub Issues, Twitter).
2. **Extracts** atomic pain signals (e.g., "Too much manual work", "Software is too expensive").
3. **Clusters** these signals semantically using vector embeddings to group identical problems.
4. **Scores** the clusters to bubble up high-confidence startup opportunities.

## ✨ Features

- **Automated Intelligence Pipeline**: Scrape, extract, cluster, and score in one command.
- **Deterministic AI Extraction**: Uses structured LLM outputs to pull exact quotes and categorize pain types without hallucinating.
- **Semantic Clustering**: Uses `pgvector` and `text-embedding-3-small` to group similar problems even when phrased differently.
- **Opportunity Scoring Engine**: Ranks ideas based on hard signals like switching intent (+40), money lost (+30), and manual workarounds (+10).
- **Pro Dashboard**: A sleek, Bloomberg-terminal-inspired Next.js UI to browse signals, problems, and curated opportunities.

## 🏗 Architecture

Awoken is split into three decoupled layers:

1. **Pipeline (Data Ingestion)**
   - Connectors fetch raw data from Hacker News, GitHub, and Twitter.
   - Saves to `raw_documents` table.
2. **Intelligence Engine (AI Processing)**
   - Extracts atomic `evidences` and `evidence_annotations` using OpenRouter (LLaMA/Claude/GPT).
   - Clusters evidence using cosine similarity into `problem_clusters`.
   - Promotes top clusters into `opportunity_candidates`.
3. **Dashboard (Next.js)**
   - Real-time React dashboard querying the Postgres database to display actionable intelligence.

## 🚀 Quickstart

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL (with `pgvector` extension)
- [uv](https://github.com/astral-sh/uv) (for fast Python package management)

### 1. Database Setup

Ensure PostgreSQL is running and create the database:
```bash
createdb awoken_db
psql -d awoken_db -c "CREATE EXTENSION vector;"
```

### 2. Environment Variables

Create a `.env` file in `apps/pipeline/.env`:

```env
OPENROUTER_API_KEY=your_api_key_here
DATABASE_URL=postgresql+psycopg2://user:password@localhost/awoken_db
GITHUB_TOKEN=your_github_pat  # Optional, but recommended
TWITTER_BEARER_TOKEN=         # Optional
```

### 3. Run the Dashboard

```bash
cd apps/dashboard
npm install
npm run dev
```
Visit **http://localhost:3000**.

### 4. Run the Pipeline

You can run the pipeline directly from the Dashboard (using the floating control panel), or via CLI:

```bash
cd apps/pipeline
uv sync
uv run python main.py
```

Then, run the intelligence engine to cluster and score:
```bash
uv run python intelligence_engine.py
```

## 📡 Data Sources

Currently supported connectors:

- **Hacker News**: Ask HN, Top Stories, and deeply nested Comments.
- **GitHub Issues**: Advanced search queries targeting feature requests, bugs, and workflow complaints across public repos.
- **Twitter / X**: (Optional) Monitors targeted keywords and complaints.

*Connectors are modular. You can easily add Reddit, ProductHunt, or StackOverflow by subclassing `BaseConnector`.*

## 🛡️ License

MIT License. See `LICENSE` for more information.
