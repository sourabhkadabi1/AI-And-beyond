import React from 'react';
import { DollarSign, ShieldCheck, CheckCircle2, HeartHandshake, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AffiliateDisclosure() {
  const lastUpdated = "September 18, 2026";

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 flex flex-col">
      {/* ── Top Header Banner (Translucent, Global Particles Flowing Behind) ── */}
      <div className="relative overflow-hidden bg-transparent border-b border-slate-200/60 dark:border-white/5 py-12 sm:py-16 transition-colors">
        {/* Ambient Glows */}
        <div className="absolute top-[-100px] right-[-60px] w-[500px] h-[500px] rounded-full bg-emerald-500/15 dark:bg-emerald-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-40px] w-[450px] h-[450px] rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            {/* Top hairline reflection */}
            <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none" />

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 mb-4 shadow-xs">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              FTC COMPLIANCE & DISCLOSURE
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-4 tracking-tight">
              Affiliate Disclosure
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Full transparency on how we fund our research and editorial operations.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
              Last Updated: <span className="font-semibold text-slate-700 dark:text-slate-300">{lastUpdated}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Content Container (Frosted Glass Legal Card) ── */}
      <div className="flex-1 bg-transparent py-12 sm:py-16 transition-colors">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-10">
            {/* Top hairline reflection */}
            <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none" />

            {/* Core FTC Disclosure Box */}
            <div className="p-6 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 text-slate-800 dark:text-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                <AlertCircle className="w-4 h-4" />
                The Core FTC Statement
              </div>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                Some links on <strong className="text-slate-950 dark:text-white">AIAndBeyond</strong> are affiliate links. If you click on an affiliate link and make a purchase, we may receive a referral commission at <strong>zero extra cost to you</strong>. In many cases, our partner links provide you with exclusive discounts or extended free trials.
              </p>
            </div>

            {/* Section 1: What is an Affiliate Link */}
            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2.5">
                <HeartHandshake className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                1. What Are Affiliate Links?
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                An affiliate link contains a special tracking code. When you click through that link to an external tool, service, or hosting provider and decide to purchase a subscription, the company gives us a small percentage of the sale to thank us for the referral.
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                This pricing is completely identical to (or better than) what you would pay going directly to the merchant's site. It allows us to keep all 500+ tutorials, benchmark guides, and AI tool analyses <strong>100% free and open to everyone</strong> without placing annoying paywalls.
              </p>
            </section>

            {/* Section 2: Editorial Integrity Pledge */}
            <section className="space-y-4 pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                2. Our Editorial Independence & Ethics Pledge
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Our readers' trust is the single most valuable asset we have. We adhere to strict editorial standards:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5">
                  <h3 className="font-bold text-sm text-slate-950 dark:text-white mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Hands-On Testing
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    We strictly test and benchmark software ourselves before publishing any recommendation.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5">
                  <h3 className="font-bold text-sm text-slate-950 dark:text-white mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Honest Pros & Cons
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    If a tool has limitations, buggy workflows, or overpriced tiers, we state it plainly.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5">
                  <h3 className="font-bold text-sm text-slate-950 dark:text-white mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero Paid Fakes
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    We never accept payment to give an inferior tool a positive review. Our opinions are always our own.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Programs We Participate In */}
            <section className="space-y-4 pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                3. Affiliate Programs We Participate In
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Depending on the topic, articles on AIAndBeyond may contain affiliate links to services including, but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 text-sm sm:text-base pl-2">
                <li><strong>Web Hosting & Cloud Services:</strong> Hostinger, DigitalOcean, Cloudways.</li>
                <li><strong>AI Software & Creative Tools:</strong> Canva, Midjourney guides, ChatGPT tool integrations, ElevenLabs, Runway.</li>
                <li><strong>Security & Privacy:</strong> NordVPN, Surfshark, password managers.</li>
                <li><strong>Online Learning & Courses:</strong> Coursera, Udemy, specialized technical certifications.</li>
                <li><strong>Automation & Workflow Tools:</strong> Make, Zapier, n8n hosting partners.</li>
              </ul>
            </section>

            {/* Section 4: Questions */}
            <section className="space-y-4 pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                4. Questions Regarding Affiliates?
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                If you have any questions regarding our affiliate partnerships, would like to inquire about a product review, or need clarification on a link, please reach out via our <Link to="/contact" className="text-emerald-600 dark:text-emerald-400 underline font-semibold">Contact Page</Link> or email us at <a href="mailto:affiliates@aiandbeyondtech.com" className="text-emerald-600 dark:text-emerald-400 font-semibold">affiliates@aiandbeyondtech.com</a>.
              </p>
            </section>

            {/* Back link */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                <ArrowLeft size={16} /> Back to Home
              </Link>
              <Link to="/about" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                Learn About Our Team →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
