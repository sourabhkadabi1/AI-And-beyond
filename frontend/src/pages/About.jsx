import React from 'react';
import { Bookmark, ExternalLink } from 'lucide-react';

const TOPICS = [
  { name: 'AI Tools', color: '#5A50EE' },
  { name: 'Web Hosting', color: '#0099BB' },
  { name: 'Tech Reviews', color: '#FF8C42' },
  { name: 'Tutorials', color: '#00B07D' },
  { name: 'Productivity', color: '#FF6B9D' },
  { name: 'MakeMoneyWithAI', color: '#16A34A' }
];

export default function About() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 flex flex-col">
      {/* ── Top Header Banner (Pure White Tier) ── */}
      <div className="bg-white dark:bg-[#080C14] border-b-2 border-slate-200 dark:border-slate-800/80 py-12 sm:py-16 transition-colors">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/90 dark:border-indigo-800/70 mb-4 shadow-xs">
            OUR MISSION & STORY
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-4 tracking-tight">
            About AIAndBeyond
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Making sense of the rapidly evolving AI and technology landscape with clear, actionable, and hype-free intelligence.
          </p>
        </div>
      </div>

      {/* ── Content Container (Soft Slate Tier with Elevated White Card) ── */}
      <div className="flex-1 bg-slate-100/90 dark:bg-[#0d1424] py-12 sm:py-16 transition-colors">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-md space-y-8">
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
              <p>
                Welcome to <strong className="text-slate-950 dark:text-white font-bold">AIAndBeyond</strong>! We are passionate about exploring the frontiers of artificial intelligence, web development, and modern productivity tools. Our goal is to test, review, and synthesize complex technical breakthroughs into clean insights you can use.
              </p>
              
              <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-slate-800 dark:text-slate-200">
                <p className="font-semibold text-sm sm:text-base">
                  💡 <strong>Why this blog exists:</strong> Technology moves at breakneck speed. Beginners and seasoned developers alike face endless noise and marketing fluff. AIAndBeyond exists to cut through the clutter with honest benchmarks, hands-on tutorials, and practical tool stacks.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white mb-6">What We Cover</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TOPICS.map(topic => (
                  <div key={topic.name} className="flex items-center gap-3.5 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 rounded-xl hover:shadow-sm transition-shadow">
                    <div 
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-xs" 
                      style={{ backgroundColor: topic.color }}
                    ></div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{topic.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pinterest Card */}
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-slate-950 dark:to-slate-900 border border-rose-200/80 dark:border-slate-800 p-8 rounded-2xl text-center shadow-xs">
              <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white mb-2">Join us on Pinterest</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">
                We regularly post visual infographics, cheat-sheets, and quick reference cards for your workflow.
              </p>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E60023] hover:bg-[#c9001f] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md shadow-rose-600/20 hover:scale-105"
              >
                <Bookmark size={18} />
                Follow on Pinterest <ExternalLink size={16} />
              </a>
            </div>

            {/* Affiliate Disclosure */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">Affiliate Disclosure</h4>
              <p>
                Some links on this blog are affiliate links. If you make a purchase through them, we may receive a small referral commission at zero extra cost to you. We strictly recommend tools and software that we have tested and trust ourselves. Thank you for supporting AIAndBeyond!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
