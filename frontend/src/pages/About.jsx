import React from 'react';
import { Bookmark, ExternalLink, ShieldCheck, CheckCircle2, Award, Users, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TOPICS = [
  { name: 'AI Tools', color: '#5A50EE', desc: 'Real-world testing of cutting-edge LLMs and creative tools' },
  { name: 'Web Hosting', color: '#0099BB', desc: 'Speed benchmarks, cloud uptime, and server reviews' },
  { name: 'AI Agents & Automation', color: '#FF8C42', desc: 'Autonomous agent frameworks, n8n, and business pipelines' },
  { name: 'Tutorials', color: '#00B07D', desc: 'Step-by-step code and no-code walkthroughs' },
  { name: 'Productivity', color: '#FF6B9D', desc: 'Systems and software to amplify your daily output' },
  { name: 'MakeMoneyWithAI', color: '#16A34A', desc: 'Ethical monetization, freelancing, and digital assets' }
];

export default function About() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 flex flex-col">
      {/* ── Top Header Banner (Translucent, Global Particles Flowing Behind) ── */}
      <div className="relative overflow-hidden bg-transparent border-b border-slate-200/60 dark:border-white/5 py-12 sm:py-16 transition-colors">
        {/* Ambient Glows */}
        <div className="absolute top-[-100px] right-[-60px] w-[500px] h-[500px] rounded-full bg-indigo-500/15 dark:bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-40px] w-[450px] h-[450px] rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            {/* Top hairline reflection */}
            <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none" />

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 mb-4 shadow-xs">
              <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              OUR MISSION & STORY
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-4 tracking-tight">
              About AIAndBeyond
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Demystifying artificial intelligence, web hosting, and modern technology with transparent, hands-on, hype-free intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* ── Content Container (Frosted Glass Story Card Floating Above Particles) ── */}
      <div className="flex-1 bg-transparent py-12 sm:py-16 transition-colors">
        <div className="max-w-3xl mx-auto px-6">
          <div className="glass-card rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-10">
            {/* Top hairline reflection */}
            <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none" />

            {/* Introduction & Story */}
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg font-normal">
              <p>
                Welcome to <strong className="text-slate-950 dark:text-white font-bold">AIAndBeyond</strong>! We are dedicated to exploring the fast-moving frontiers of artificial intelligence, autonomous agents, web development, and digital productivity. Our core objective is simple: test, review, and synthesize complex technical breakthroughs into clean, practical blueprints you can use today.
              </p>
              
              <div className="p-6 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-slate-800 dark:text-slate-200">
                <p className="font-semibold text-sm sm:text-base leading-relaxed">
                  💡 <strong>Why this blog exists:</strong> Technology moves at breakneck speed. Beginners, students, and seasoned developers alike face relentless hype cycles, sponsored fluff, and shallow listicles. AIAndBeyond was built to cut through the clutter with honest benchmarks, real code examples, and battle-tested tool stacks.
                </p>
              </div>
            </div>

            {/* Meet the Founder & Editorial Standards */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 space-y-6">
              <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2.5">
                <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Who is Behind AIAndBeyond?
              </h2>

              <div className="p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-md flex-shrink-0">
                  SK
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white">Sourabh Kadabi</h3>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Founder & Lead Editor</p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Tech builder and researcher passionate about empowering creators with artificial intelligence. Sourabh tests every tool, writes hands-on workflows, and manages the editorial standards of AIAndBeyond to ensure everything published is accurate, safe, and actionable.
                  </p>
                  <div className="pt-1">
                    <Link to="/contact" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1">
                      <Mail size={13} /> Get in touch with Sourabh & the team →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Trust Us / E-E-A-T Principles */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Why You Can Trust Our Content
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white mb-1">Hands-On Testing</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">We don't copy-paste press releases. We run benchmarks, install SDKs, and build real projects.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white mb-1">Hype-Free Honesty</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">If software has latency, hallucinations, or predatory pricing, we clearly highlight the flaws.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white mb-1">Transparent Funding</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Affiliate links keep our content free, but brand sponsorships never buy positive scores.</p>
                </div>
              </div>
            </div>

            {/* What We Cover (6 Topics) */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white mb-6">What We Cover</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TOPICS.map(topic => (
                  <Link 
                    key={topic.name} 
                    to={`/blog?category=${encodeURIComponent(topic.name)}`}
                    className="p-4 rounded-2xl glass-card glass-card-hover hover:scale-[1.02] transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div 
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-xs" 
                        style={{ backgroundColor: topic.color }}
                      ></div>
                      <span className="font-bold text-sm text-slate-950 dark:text-white">{topic.name}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 pl-6">{topic.desc}</p>
                  </Link>
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

            {/* Affiliate & Legal Navigation Deck */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <p>
                © {new Date().getFullYear()} AIAndBeyond · All content independently verified.
              </p>
              <div className="flex items-center gap-4 font-semibold text-slate-700 dark:text-slate-300">
                <Link to="/affiliate-disclosure" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline">
                  Affiliate Disclosure
                </Link>
                <Link to="/privacy-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline">
                  Privacy Policy
                </Link>
                <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline">
                  Contact Us
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
