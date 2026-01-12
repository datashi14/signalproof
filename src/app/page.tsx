"use client";

import React, { useState } from 'react';
import { Search, Globe, Shield, Zap, List, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SignalProofDashboard() {
  const [subject, setSubject] = useState('');
  const [context, setContext] = useState('');
  const [status, setStatus] = useState<'idle' | 'running' | 'completed'>('idle');

  const stages = [
    { name: 'Planning', status: 'completed', duration: '2s' },
    { name: 'Claim Extraction', status: 'completed', duration: '5s' },
    { name: 'Evidence Sourcing', status: 'completed', duration: '12s' },
    { name: 'Verification', status: 'running', duration: '8s...' },
    { name: 'Synthesis', status: 'pending', duration: '-' },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 font-sans selection:bg-purple-500/30">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              SignalProof
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <button className="hover:text-white transition-colors">History</button>
            <button className="hover:text-white transition-colors">Evaluation</button>
            <div className="h-4 w-px bg-white/10" />
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            Evidence-First Research
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Turn messy claims into transparent, reviewable research packs. 
            No unverifiable claims. Every conclusion links to evidence.
          </p>
        </div>

        {/* Search Section */}
        <section className="relative group max-w-3xl mx-auto mb-16">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Subject Name</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="e.g. Jane Doe"
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Research Context</label>
                <input 
                  type="text" 
                  placeholder="e.g. Senior Software Engineer role"
                  className="w-full bg-zinc-900 border border-white/5 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </div>
            </div>
            
            <button 
              onClick={() => setStatus('running')}
              className="w-full bg-white text-black font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 fill-current" />
              Launch Research Workflow
            </button>
          </div>
        </section>

        {status === 'running' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Live Status</span>
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                </div>
                <div className="text-3xl font-bold mb-2">Analyzing</div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-full w-[65%]" />
                </div>
              </div>
              
              <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Evidence Found</span>
                  <Globe className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-3xl font-bold mb-1">14</div>
                <div className="text-sm text-zinc-500">Verified across 6 sources</div>
              </div>

              <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Credibility Score</span>
                  <Shield className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-3xl font-bold mb-1">92%</div>
                <div className="text-sm text-zinc-400">Low risk path cost (SSSP)</div>
              </div>
            </div>

            {/* Research Pack Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Claims & Summary (Main Content) */}
              <div className="lg:col-span-8 space-y-8">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Shield className="w-32 h-32" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-8">
                    <List className="w-5 h-5 text-purple-500" />
                    <h2 className="text-xl font-bold">Research Pack: {subject || 'Quantum Engineer'}</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { claim: "Led engineering for a $20M Series A platform", cat: "Impact", conf: "High", refs: ["E1", "E4"] },
                      { claim: "Introduced distributed tracing to legacy monolith", cat: "Technical", conf: "Med", refs: ["E2"] },
                      { claim: "Managed team of 12 across 3 timezones", cat: "Leadership", conf: "High", refs: ["E3"] }
                    ].map((item, i) => (
                      <div key={i} className="group bg-zinc-900/40 border border-white/5 rounded-xl p-5 hover:border-white/20 transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                              item.cat === 'Technical' ? 'bg-blue-500/10 text-blue-400' : 
                              item.cat === 'Impact' ? 'bg-green-500/10 text-green-400' : 'bg-purple-500/10 text-purple-400'
                            }`}>
                              {item.cat}
                            </span>
                            <span className="text-xs text-zinc-500">Confidence: {item.conf}</span>
                          </div>
                          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-[10px] font-bold text-zinc-500 hover:text-green-400 uppercase tracking-widest transition-colors">Approve</button>
                            <button className="text-[10px] font-bold text-zinc-500 hover:text-red-400 uppercase tracking-widest transition-colors">Reject</button>
                          </div>
                        </div>
                        <p className="text-[15px] text-zinc-200 mb-4">{item.claim}</p>
                        <div className="flex gap-2">
                          {item.refs.map(r => (
                            <button key={r} className="text-[10px] font-mono bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-white/50 border border-white/5 transition-colors">[{r}]</button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/5">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-zinc-500" />
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Synthesized Summary</h3>
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-sm">
                      Jane demonstrates high technical proficiency in distributed systems <span className="bg-purple-500/20 text-purple-300 px-1 rounded cursor-help">[E2]</span>. 
                      Her leadership at NextFlow resulted in a documented 40% reduction in latency <span className="bg-green-500/20 text-green-300 px-1 rounded cursor-help">[E1]</span>, 
                      though specific details on her contribution to the Series A funding remains moderately uncertain <span className="bg-zinc-500/20 text-zinc-300 px-1 rounded cursor-help">[E4]</span>.
                      <br /><br />
                      <span className="text-zinc-500 italic">No facts identified outside of documented evidence.</span>
                    </p>
                  </div>
                </div>

                {/* Contradictions Panel */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 shadow-inner shadow-red-500/5">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <h3 className="font-bold text-red-100 italic">Contradiction Detected</h3>
                  </div>
                  <div className="text-sm text-red-200/60 p-5 bg-red-950/20 rounded-xl border border-red-500/10">
                    <div className="flex justify-between items-start mb-2">
                       <p className="font-medium text-red-200 whitespace-pre-wrap">"Managed team of 12" [E3] vs "Contributor Role" [E5] in blog archives.</p>
                       <span className="text-[10px] font-bold bg-red-500/20 px-2 py-0.5 rounded text-red-400 uppercase">Conflict</span>
                    </div>
                    <p className="text-xs text-red-300/40 italic">Confidence trap: High LLM confidence noted on [E3] despite direct source conflict in [E5]. Manual check recommended.</p>
                  </div>
                </div>
              </div>

              {/* Sidebar: Pipeline & Evidence */}
              <div className="lg:col-span-4 space-y-6">
                {/* Stage Indicators */}
                <div className="bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden p-6">
                   <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Workflow Progress</h3>
                  {stages.map((stage, i) => (
                    <div key={i} className="flex items-center justify-between py-3 group">
                      <div className="flex items-center gap-4">
                        {stage.status === 'completed' ? (
                          <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          </div>
                        ) : stage.status === 'running' ? (
                          <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <div className="w-5 h-5 border border-white/10 rounded-full" />
                        )}
                        <span className={`text-sm font-medium ${stage.status === 'pending' ? 'text-zinc-600' : 'text-zinc-300'}`}>
                          {stage.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600">{stage.duration}</span>
                    </div>
                  ))}
                </div>

                {/* Evidence Library (SSSP Ranked) */}
                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-xs uppercase tracking-widest text-zinc-500">Evidence Library</h2>
                    <Shield className="w-4 h-4 text-zinc-700" />
                  </div>
                  <div className="space-y-4">
                    {[
                      { id: "E1", source: "GitHub PR #241", snippet: "...architected the migration from REST to gRPC for the core checkout service...", cost: 0.12 },
                      { id: "E2", source: "Personal Blog", snippet: "...experience leading 12 engineers in a high-growth environment...", cost: 0.45 },
                      { id: "E3", source: "LinkedIn Profile", snippet: "Managed Cross-Functional Team (12 direct reports)", cost: 0.08 }
                    ].map((item) => (
                      <div key={item.id} className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/10 transition-all cursor-pointer group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-mono text-purple-400">[{item.id}]</span>
                          <span className="text-[10px] font-bold text-zinc-600 group-hover:text-zinc-400">PATH_COST: {item.cost}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed italic mb-3 opacity-70 group-hover:opacity-100 transition-opacity">"{item.snippet}"</p>
                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">{item.source}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="py-20 border-t border-white/5 text-center mt-20">
        <div className="text-xs font-semibold text-zinc-600 uppercase tracking-[0.4em] mb-4">SignalProof Research Systems</div>
        <div className="text-zinc-500 text-sm max-w-sm mx-auto">
          Built for teams who prioritize verifiable truth over black-box predictions.
        </div>
      </footer>
    </div>
  );
}
