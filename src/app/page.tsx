"use client";

import React, { useState, useEffect } from 'react';
import { Search, Globe, Shield, Zap, List, Clock, CheckCircle2, AlertCircle, FileText, ExternalLink } from 'lucide-react';

export default function SignalProofDashboard() {
  const [subject, setSubject] = useState('');
  const [context, setContext] = useState('');
  const [status, setStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [activeTab, setActiveTab] = useState<'pack' | 'graph'>('pack');

  const stages = [
    { name: 'Initial Planning', status: 'completed', duration: '1.2s' },
    { name: 'Claim Extraction', status: 'completed', duration: '3.4s' },
    { name: 'GitHub/LinkedIn Sourcing', status: 'completed', duration: '8.1s' },
    { name: 'SSSP Credibility Scoring', status: 'completed', duration: '0.8s' },
    { name: 'Final Synthesis', status: 'completed', duration: '4.2s' },
  ];

  // Auto-complete simulation for "Senior Engineer" run
  const handleLaunch = () => {
    setStatus('running');
    // In a real app, this would call the Trigger.dev job via an API route
  };

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
          <div className="flex items-center gap-6 text-sm text-zinc-400 font-medium">
            <button className="hover:text-white transition-colors">History</button>
            <button className="hover:text-white transition-colors">Evaluation</button>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Agent Systems Active
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header - Conditional Rendering */}
        {status === 'idle' && (
          <div className="mb-16 text-center animate-in fade-in zoom-in duration-700">
            <h1 className="text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              Evidence-First Research
            </h1>
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">
              Verify production AI and systems claims with high-fidelity agents. 
              We replace black-box ranking with auditable credibility graphs.
            </p>
          </div>
        )}

        {/* Input Section */}
        <section className={`transition-all duration-700 max-w-3xl mx-auto ${status !== 'idle' ? 'mb-12' : 'mb-20'}`}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Research Subject</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input 
                      type="text" 
                      placeholder="e.g. Senior Systems Engineer"
                      className="w-full bg-[#050505] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all font-medium"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Context / Intent</label>
                  <input 
                    type="text" 
                    placeholder="Verify production AI & cloud claims"
                    className="w-full bg-[#050505] border border-white/5 rounded-xl py-4 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all font-medium"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                  />
                </div>
              </div>
              
              <button 
                onClick={handleLaunch}
                disabled={status === 'running'}
                className="w-full bg-white text-black font-bold py-5 rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl shadow-white/5"
              >
                {status === 'running' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Executing Agent System...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-current transition-transform group-hover:scale-125" />
                    Launch Deep Verification Workflow
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {status !== 'idle' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Live Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Agent Status', val: 'Synthesis', icon: Zap, color: 'text-purple-400' },
                { label: 'Evidence Chunks', val: '24', icon: Globe, color: 'text-blue-400' },
                { label: 'Path Credibility', val: '94.2%', icon: Shield, color: 'text-green-400' },
                { label: 'Run Cost', val: '$0.42', icon: Clock, color: 'text-zinc-400' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl backdrop-blur-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                    <stat.icon className={`w-12 h-12 ${stat.color} blur-[2px]`} />
                  </div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">{stat.label}</div>
                  <div className="text-3xl font-bold tracking-tighter">{stat.val}</div>
                </div>
              ))}
            </div>

            {/* Main Result Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Research Pack */}
              <div className="lg:col-span-8 space-y-8">
                {/* Synthesized Research Pack */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                        <FileText className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold tracking-tight">Research Pack: Senior Architect</h2>
                        <p className="text-xs text-zinc-500 font-medium">Verify production AI and systems claims • Generated Just Now</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Export PDF
                    </button>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.25em] mb-6">Executive Synthesis</h3>
                    <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                      Subject demonstrates significant expertise in large-scale production identity systems <span className="text-purple-400 font-mono bg-purple-400/10 px-1.5 py-0.5 rounded cursor-help">[E1]</span>. 
                      Cloud migration claims are supported by GitHub PR history showing a 30% reduction in cold boot times <span className="text-blue-400 font-mono bg-blue-400/10 px-1.5 py-0.5 rounded cursor-help">[E3]</span>. 
                      However, leadership claims at 'NextGen AI' show a timeline mismatch between public blog posts and LinkedIn tenure <span className="text-red-400 font-mono bg-red-400/10 px-1.5 py-0.5 rounded cursor-help">[E5]</span>.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] mb-4">Evidence-Verified Claims</h3>
                    {[
                      { claim: "Architected Zero-Trust Production Auth System", cat: "Systems", conf: "High", refs: ["E1", "E2"] },
                      { claim: "Reduced AI Inference Latency by 40ms", cat: "Production AI", conf: "High", refs: ["E3"] },
                      { claim: "Led Platform Team of 15 Engineers", cat: "Leadership", conf: "Low", refs: ["E5"], conflict: true }
                    ].map((item, i) => (
                      <div key={i} className={`group bg-[#050505] border ${item.conflict ? 'border-red-500/20 shadow-red-500/5 shadow-inner' : 'border-white/5'} rounded-2xl p-6 hover:border-white/20 transition-all`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-white/5">
                              {item.cat}
                            </span>
                            <span className={`text-[11px] font-bold ${item.conflict ? 'text-red-400' : 'text-zinc-500'}`}>
                              {item.conflict ? '⚠️ CONTRADICTION' : `Confidence: ${item.conf}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-[10px] font-bold text-green-500 uppercase tracking-widest hover:brightness-125">Approve</button>
                            <button className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:brightness-125">Reject</button>
                          </div>
                        </div>
                        <p className="text-[17px] font-medium text-zinc-200 mb-6 leading-tight">{item.claim}</p>
                        <div className="flex gap-2">
                          {item.refs.map(r => (
                            <button key={r} className="text-[11px] font-mono bg-[#0f0f0f] hover:bg-white/10 px-3 py-1.5 rounded-lg text-zinc-400 border border-white/5 transition-colors">[{r}]</button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Library & Stages */}
              <div className="lg:col-span-4 space-y-8">
                {/* Agent Workflow Progress */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-xl">
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-8">Agent Lifecycle</h3>
                  <div className="space-y-6">
                    {stages.map((stage, i) => (
                      <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          {stage.status === 'completed' ? (
                            <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                          )}
                          <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{stage.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600">{stage.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evidence Library (SSSP Path) */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-xl">
                   <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Evidence Library</h3>
                    <div className="px-2 py-0.5 bg-blue-500/10 rounded text-[9px] font-bold text-blue-400 uppercase">Path Cost Ranked</div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { id: "E1", source: "GitHub: production-auth-lib", payload: "Merge PR #412: Migration to Zero-Trust architecture completes.", path: 0.04 },
                      { id: "E3", source: "CloudOps Blog (Public)", payload: "cold-boot times dropped from 200ms to 40ms after gRPC introduction.", path: 0.12 },
                      { id: "E5", source: "LinkedIn: Career History", payload: "Founded AI Architecture group. Led 15 engineers.", path: 0.85 },
                    ].map((evidence) => (
                      <div key={evidence.id} className="p-5 bg-[#050505] border border-white/5 rounded-2xl hover:border-white/10 transition-all group cursor-pointer">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-mono text-purple-400 font-bold">[{evidence.id}]</span>
                          <span className={`text-[10px] font-bold tracking-tighter ${evidence.path > 0.5 ? 'text-red-500' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                            COST_PENALTY: {evidence.path}
                          </span>
                        </div>
                        <p className="text-[12px] text-zinc-400 leading-relaxed italic mb-4 opacity-60 group-hover:opacity-100 transition-opacity">"{evidence.payload}"</p>
                        <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{evidence.source}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 text-center mt-20">
        <div className="text-[11px] font-bold text-zinc-700 uppercase tracking-[0.4em] mb-4">SignalProof Deep Evidence Layer</div>
        <p className="text-zinc-500 text-sm max-w-sm mx-auto font-medium">
          Evidence-first research for high-conviction decisions. No hallucinations, only citations.
        </p>
      </footer>
    </div>
  );
}
