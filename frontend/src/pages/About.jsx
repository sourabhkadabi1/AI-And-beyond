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
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#111111] dark:text-[#FFFFFF] flex flex-col">
      {/* ── Editorial Header ── */}
      <div className="border-b border-[#E5E5E5] dark:border-[#262626] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-xl p-8 sm:p-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg text-xs font-extrabold bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/30 mb-4">
              <Award className="w-3.5 h-3.5 text-[#F5A623]" />
              OUR MISSION & STORY
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[#111111] dark:text-[#FFFFFF] mb-4 tracking-tight">
              About AIAndBeyond
            </h1>
            <p className="text-base sm:text-lg text-[#555555] dark:text-[#A0A0A0] max-w-2xl mx-auto leading-relaxed font-normal">
              Demystifying artificial intelligence, web hosting, and modern technology with transparent, hands-on, hype-free intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-xl p-8 sm:p-12 space-y-10">

            {/* Introduction & Story */}
            <div className="space-y-4 text-[#555555] dark:text-[#A0A0A0] leading-relaxed text-base sm:text-lg font-normal">
              <p>
                Welcome to <strong className="text-[#111111] dark:text-[#FFFFFF] font-bold">AIAndBeyond</strong>! We are dedicated to exploring the fast-moving frontiers of artificial intelligence, autonomous agents, web development, and digital productivity. Our core objective is simple: test, review, and synthesize complex technical breakthroughs into clean, practical blueprints you can use today.
              </p>
              
              <div className="p-6 rounded-lg bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#111111] dark:text-[#FFFFFF]">
                <p className="font-semibold text-sm sm:text-base leading-relaxed">
                  💡 <strong>Why this blog exists:</strong> Technology moves at breakneck speed. Beginners, students, and seasoned developers alike face relentless hype cycles, sponsored fluff, and shallow listicles. AIAndBeyond was built to cut through the clutter with honest benchmarks, real code examples, and battle-tested tool stacks.
                </p>
              </div>
            </div>

            {/* Meet the Founder & Editorial Standards */}
            <div className="pt-6 border-t border-[#E5E5E5] dark:border-[#262626] space-y-6">
              <h2 className="font-display text-2xl font-bold text-[#111111] dark:text-[#FFFFFF] flex items-center gap-2.5">
                <Users className="w-5 h-5 text-[#F5A623]" />
                Who is Behind AIAndBeyond?
              </h2>

              <div className="p-6 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626] flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                <div className="w-16 h-16 rounded-xl bg-[#F5A623] flex items-center justify-center text-[#0A0A0A] font-extrabold text-2xl flex-shrink-0">
                  SK
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#111111] dark:text-[#FFFFFF]">SKAiMentor</h3>
                    <p className="text-xs font-semibold text-[#F5A623]">Founder & Lead Editor</p>
                  </div>
                  <p className="text-xs sm:text-sm text-[#555555] dark:text-[#A0A0A0] leading-relaxed">
                    Tech builder and researcher passionate about empowering creators with artificial intelligence. SKAiMentor tests every tool, writes hands-on workflows, and manages the editorial standards of AIAndBeyond to ensure everything published is accurate, safe, and actionable.
                  </p>
                  <div className="pt-1">
                    <Link to="/contact" className="text-xs font-bold text-[#F5A623] hover:underline inline-flex items-center gap-1">
                      <Mail size={13} /> Get in touch with SKAiMentor & the team →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Trust Us / E-E-A-T Principles */}
            <div className="pt-6 border-t border-[#E5E5E5] dark:border-[#262626] space-y-4">
              <h2 className="font-display text-2xl font-bold text-[#111111] dark:text-[#FFFFFF] flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Why You Can Trust Our Content
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
                  <h4 className="font-bold text-sm text-[#111111] dark:text-[#FFFFFF] mb-1">Hands-On Testing</h4>
                  <p className="text-xs text-[#555555] dark:text-[#A0A0A0]">We don't copy-paste press releases. We run benchmarks, install SDKs, and build real projects.</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
                  <h4 className="font-bold text-sm text-[#111111] dark:text-[#FFFFFF] mb-1">Hype-Free Honesty</h4>
                  <p className="text-xs text-[#555555] dark:text-[#A0A0A0]">If software has latency, hallucinations, or predatory pricing, we clearly highlight the flaws.</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
                  <h4 className="font-bold text-sm text-[#111111] dark:text-[#FFFFFF] mb-1">Transparent Funding</h4>
                  <p className="text-xs text-[#555555] dark:text-[#A0A0A0]">Affiliate links keep our content free, but brand sponsorships never buy positive scores.</p>
                </div>
              </div>
            </div>

            {/* What We Cover (6 Topics) */}
            <div className="pt-6 border-t border-[#E5E5E5] dark:border-[#262626]">
              <h2 className="font-display text-2xl font-bold text-[#111111] dark:text-[#FFFFFF] mb-6">What We Cover</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TOPICS.map(topic => (
                  <Link 
                    key={topic.name} 
                    to={`/blog?category=${encodeURIComponent(topic.name)}`}
                    className="p-4 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626] hover:border-[#F5A623] transition-colors flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div 
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: topic.color }}
                      ></div>
                      <span className="font-bold text-sm text-[#111111] dark:text-[#FFFFFF]">{topic.name}</span>
                    </div>
                    <p className="text-xs text-[#555555] dark:text-[#A0A0A0] pl-6">{topic.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Pinterest Card */}
            <div className="bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626] p-8 rounded-lg text-center">
              <h3 className="font-display text-xl font-bold text-[#111111] dark:text-[#FFFFFF] mb-2">Join us on Pinterest</h3>
              <p className="text-sm text-[#555555] dark:text-[#A0A0A0] mb-6 max-w-md mx-auto">
                We regularly post visual infographics, cheat-sheets, and quick reference cards for your workflow.
              </p>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E60023] hover:bg-[#c9001f] text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors"
              >
                <Bookmark size={18} />
                Follow on Pinterest <ExternalLink size={16} />
              </a>
            </div>

            {/* Affiliate & Legal Navigation */}
            <div className="pt-6 border-t border-[#E5E5E5] dark:border-[#262626] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#555555] dark:text-[#A0A0A0]">
              <p>
                © {new Date().getFullYear()} AIAndBeyond · All content independently verified.
              </p>
              <div className="flex items-center gap-4 font-semibold text-[#111111] dark:text-[#FFFFFF]">
                <Link to="/affiliate-disclosure" className="hover:text-[#F5A623] underline">
                  Affiliate Disclosure
                </Link>
                <Link to="/privacy-policy" className="hover:text-[#F5A623] underline">
                  Privacy Policy
                </Link>
                <Link to="/contact" className="hover:text-[#F5A623] underline">
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
