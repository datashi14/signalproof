"use client";

import React, { useState } from 'react';
import { Search, Globe, Shield, Zap, List, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SignalProofDashboard() {
  const [subject, setSubject] = useState('');
  const [context, setContext] = useState('');
  const [status, setStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);

  const stages = [
    { name: 'Planning', status: 'completed', duration: '2s' },
    { name: 'Claim Extraction', status: 'running', duration: '5s' },
    { name: 'Evidence Sourcing', status: 'pending', duration: '-' },
    { name: 'Verification', status: 'pending', duration: '-' },
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

      <main className="max-w-5xl mx-auto px-6 py-12">
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
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Progress Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Live Status</span>
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                </div>
                <div className="text-3xl font-bold mb-2">Analyzing</div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-full w-[45%]" />
                </div>
              </div>
              
              <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Evidence Counts</span>
                  <Globe className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-3xl font-bold mb-1">12</div>
                <div className="text-sm text-zinc-500">Sources identified</div>
              </div>

              <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Resource Usage</span>
                  <Clock className="w-4 h-4 text-zinc-500" />
                </div>
                <div className="text-3xl font-bold mb-1">$0.24</div>
                <div className="text-sm text-zinc-500">Est. cost (GPT-4o + Claude)</div>
              </div>
            </div>

            {/* Stage List */}
            <div className="bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden">
              {stages.map((stage, i) => (
                <div key={i} className={`flex items-center justify-between p-6 border-b border-white/5 last:border-0 ${stage.status === 'running' ? 'bg-white/[0.02]' : ''}`}>
                  <div className="flex items-center gap-4">
                    {stage.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : stage.status === 'running' ? (
                      <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-white/10 rounded-full" />
                    )}
                    <span className={`font-medium ${stage.status === 'pending' ? 'text-zinc-600' : 'text-zinc-200'}`}>
                      {stage.name}
                    </span>
                  </div>
                  <span className="text-sm text-zinc-500">{stage.duration}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="text-xs font-medium text-zinc-600 uppercase tracking-[0.2em] mb-2">Built with Integrity</div>
        <div className="text-zinc-500 text-sm">© 2026 SignalProof AI Research Labs</div>
      </footer>
    </div>
  );
}
