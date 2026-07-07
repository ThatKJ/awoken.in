"use client";

import { useState, useEffect, useRef, FormEvent } from 'react';
import Topbar from '@/components/Topbar';

type SearchResult = {
  title: string;
  summary: string;
  exact_quote: string;
  why_it_matters: string;
  confidence: number;
  source_url: string;
};

type SearchResponse = {
  mode_used: "strict" | "semantic" | "signal_fallback" | "raw" | "error";
  signal_density: "high" | "medium" | "low";
  explanation: string;
  results: SearchResult[];
};

const CACHE_SIZE = 5;

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [cache, setCache] = useState<Map<string, SearchResponse>>(new Map());
  
  // Ref for debouncing auto-search (if desired)
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    if (cache.has(searchQuery)) {
      setData(cache.get(searchQuery)!);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery })
      });
      const resultData: SearchResponse = await res.json();
      
      // Update Cache (LRU style up to 5)
      setCache(prev => {
        const next = new Map(prev);
        if (next.size >= CACHE_SIZE) {
          const firstKey = next.keys().next().value;
          next.delete(firstKey as string);
        }
        next.set(searchQuery, resultData);
        return next;
      });
      
      setData(resultData);
    } catch (e) {
      console.error(e);
      // Fallback per requirements (never empty)
      setData({
        mode_used: "error",
        signal_density: "low",
        explanation: "Network error occurred while expanding search space.",
        results: [{
          title: "System Error",
          summary: "Could not reach intelligence engine.",
          exact_quote: "Please check your connection or try a broader query.",
          why_it_matters: "System fault.",
          confidence: 0,
          source_url: ""
        }]
      });
    } finally {
      setIsSearching(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    performSearch(query);
  };

  // Debounced auto-search when user stops typing
  useEffect(() => {
    if (!query.trim()) {
      setData(null);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const getModeBadge = (mode: string) => {
    switch (mode) {
      case 'strict': return { label: 'STRICT', color: '#059669', bg: '#ecfdf5' }; // Green
      case 'semantic': return { label: 'SEMANTIC', color: '#2563eb', bg: '#eff6ff' }; // Blue
      case 'signal_fallback': return { label: 'FALLBACK', color: '#d97706', bg: '#fffbeb' }; // Orange
      case 'raw': return { label: 'RAW', color: '#dc2626', bg: '#fef2f2' }; // Red
      default: return { label: 'ERROR', color: '#4b5563', bg: '#f3f4f6' };
    }
  };

  const getDensityColor = (density: string) => {
    if (density === 'high') return '#059669'; // Green
    if (density === 'medium') return '#d97706'; // Orange
    return '#4b5563'; // Gray
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#111827', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Topbar />
      
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px' }}>
        {/* Search Header */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 24, color: '#000' }}>
            Intelligence Terminal
          </h1>
          <form onSubmit={onSubmit} style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 16, top: 14, color: '#9ca3af', fontSize: 20 }}>
              search
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="E.g. Find B2B SaaS products founders hate..."
              autoFocus
              style={{
                width: '100%',
                padding: '12px 16px 12px 48px',
                fontSize: 16,
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                outline: 'none',
                color: '#111827',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                transition: 'border-color 0.15s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#fbbf24'} // Yellow accent
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </form>
        </div>

        {/* Loading State */}
        {isSearching && (
          <div style={{ textAlign: 'center', padding: 40, color: '#6b7280', fontSize: 14 }}>
            <div style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid #e5e7eb', borderTopColor: '#fbbf24', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: 12, verticalAlign: 'middle' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            Expanding search space...
          </div>
        )}

        {/* Results */}
        {!isSearching && data && data.results && data.results.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Meta Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: 12, marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Signal Density: <span style={{ color: getDensityColor(data.signal_density) }}>{data.signal_density.toUpperCase()}</span>
                </span>
                <span style={{ fontSize: 13, color: '#9ca3af' }}>|</span>
                <span style={{ fontSize: 13, color: '#6b7280' }}>
                  {data.explanation}
                </span>
              </div>
              <div style={{ fontSize: 13, color: '#6b7280' }}>
                {data.results.length} results
              </div>
            </div>

            {/* List */}
            {data.results.map((result, idx) => {
              const badge = getModeBadge(data.mode_used);
              
              return (
                <div key={idx} style={{ 
                  padding: 20, 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #f3f4f6', 
                  borderLeft: `3px solid ${badge.color}`,
                  borderRadius: 4,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', margin: 0, lineHeight: 1.4 }}>
                      {result.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ 
                        fontSize: 11, 
                        fontWeight: 700, 
                        padding: '2px 8px', 
                        backgroundColor: badge.bg, 
                        color: badge.color, 
                        borderRadius: 4,
                        letterSpacing: '0.05em'
                      }}>
                        {badge.label}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#4b5563' }}>
                        {(result.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <blockquote style={{ 
                    fontSize: 14, 
                    color: '#6b7280', 
                    margin: 0, 
                    paddingLeft: 12, 
                    borderLeft: '2px solid #e5e7eb',
                    fontStyle: 'italic',
                    lineHeight: 1.5
                  }}>
                    "{result.exact_quote}"
                  </blockquote>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>
                      <span style={{ color: '#9ca3af', marginRight: 4 }}>Why it matters:</span>
                      {result.why_it_matters}
                    </div>
                    {result.source_url && (
                      <a 
                        href={result.source_url} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ 
                          fontSize: 12, 
                          color: '#fbbf24', 
                          fontWeight: 600, 
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4
                        }}
                        onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                      >
                        Source <span className="material-symbols-outlined" style={{ fontSize: 12 }}>open_in_new</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
