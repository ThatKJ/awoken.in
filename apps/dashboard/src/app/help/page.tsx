import Topbar from '@/components/Topbar';

export default function HelpPage() {
  const faqs = [
    {
      q: 'How does the intelligence pipeline work?',
      a: 'The pipeline runs in three stages. First, it scrapes raw documents from sources like HackerNews and GitHub. Second, it uses an LLM to extract "atomic evidence" (quotes and pain signals). Finally, it uses semantic embeddings to group evidence into Problem Clusters and scores them to surface Opportunity Candidates.'
    },
    {
      q: 'Why are some Opportunities scored higher than others?',
      a: 'The Intelligence Engine uses a deterministic scoring system. Points are awarded for explicit signals of switching intent (+40), money lost (+30), high frequency of complaint (+10), existence of manual workarounds (+10), and direct feature requests (+10).'
    },
    {
      q: 'How do I add a new data source?',
      a: 'Currently, Awoken supports Hacker News and GitHub out of the box. You can enable them in the Settings page. Twitter/X integration is built-in but requires adding your Developer Bearer Token to the .env file.'
    },
    {
      q: 'What is the difference between a Problem and an Opportunity?',
      a: 'A Problem Cluster is a raw grouping of semantically similar evidence (people complaining about the same thing). An Opportunity Candidate is a curated, scored version of a Problem Cluster that Awoken has identified as a strong potential startup or feature idea based on pain signals.'
    },
    {
      q: 'Where is my data stored?',
      a: 'Everything is stored locally in your PostgreSQL database (awoken_db). No proprietary data is sent to the cloud, other than the text sent to the configured LLM API (OpenRouter) for extraction.'
    }
  ];

  return (
    <>
      <Topbar />
      <div className="content">
        <div className="page-eyebrow">
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>help</span>
          Documentation
        </div>
        <h1 className="page-title">Help & FAQs</h1>
        <p className="page-subtitle">Learn how to use Awoken to discover startup opportunities.</p>

        <div style={{ marginTop: 40, maxWidth: 800 }}>
          <div className="section-card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 24 }}>Frequently Asked Questions</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ paddingBottom: i !== faqs.length - 1 ? 24 : 0, borderBottom: i !== faqs.length - 1 ? '1px solid var(--color-outline-variant)' : 'none' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 8 }}>
                    {faq.q}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--color-secondary)', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="section-card" style={{ padding: 24, textDecoration: 'none', transition: 'background 0.2s', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--color-on-surface)' }}>code</span>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-on-surface)' }}>GitHub Repository</div>
              <div style={{ fontSize: 13, color: 'var(--color-secondary)' }}>View the source code, report bugs, or contribute to Awoken.</div>
            </a>
            
            <a href="#" className="section-card" style={{ padding: 24, textDecoration: 'none', transition: 'background 0.2s', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'var(--color-primary)' }}>chat</span>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-on-surface)' }}>Community Discord</div>
              <div style={{ fontSize: 13, color: 'var(--color-secondary)' }}>Join other founders building with Awoken intelligence.</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
