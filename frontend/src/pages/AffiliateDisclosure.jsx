import React from 'react';
import { DollarSign, ShieldCheck, CheckCircle2, HeartHandshake, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AffiliateDisclosure() {
  const lastUpdated = "September 18, 2026";

  return (
    <div className="min-h-screen text-[#111111] dark:text-[#FFFFFF] flex flex-col">
      {/* ── Top Header Banner ── */}
      <div className="border-b border-[#E5E5E5] dark:border-[#262626] py-12 sm:py-16 bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#999999] dark:text-[#666666] mb-4">
            FTC Compliance & Disclosure
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[#111111] dark:text-white mb-4 tracking-tight">
            Affiliate Disclosure
          </h1>
          <p className="text-base sm:text-lg text-[#555555] dark:text-[#A0A0A0] max-w-2xl mx-auto leading-relaxed">
            Full transparency on how we fund our research and editorial operations.
          </p>
          <p className="text-xs text-[#999999] dark:text-[#666666] mt-4">
            Last Updated: <span className="font-semibold text-[#555555] dark:text-[#A0A0A0]">{lastUpdated}</span>
          </p>
        </div>
      </div>

      {/* ── Content Container ── */}
      <div className="flex-1 bg-[#FAFAFA] dark:bg-[#0A0A0A] py-12 sm:py-16 transition-colors">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-xl p-8 sm:p-12 space-y-10">

            {/* Core FTC Disclosure Box */}
            <div className="p-6 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#F5A623] text-sm">
                <AlertCircle className="w-4 h-4" />
                The Core FTC Statement
              </div>
              <p className="text-sm sm:text-base text-[#555555] dark:text-[#A0A0A0] font-medium leading-relaxed">
                Some links on <strong className="text-[#111111] dark:text-white">AIAndBeyond</strong> are affiliate links. If you click on an affiliate link and make a purchase, we may receive a referral commission at <strong>zero extra cost to you</strong>. In many cases, our partner links provide you with exclusive discounts or extended free trials.
              </p>
            </div>

            {/* Section 1: What is an Affiliate Link */}
            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#111111] dark:text-white flex items-center gap-2.5">
                <HeartHandshake className="w-5 h-5 text-[#F5A623]" />
                1. What Are Affiliate Links?
              </h2>
              <p className="text-[#555555] dark:text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
                An affiliate link contains a special tracking code. When you click through that link to an external tool, service, or hosting provider and decide to purchase a subscription, the company gives us a small percentage of the sale to thank us for the referral.
              </p>
              <p className="text-[#555555] dark:text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
                This pricing is completely identical to (or better than) what you would pay going directly to the merchant's site. It allows us to keep all 500+ tutorials, benchmark guides, and AI tool analyses <strong>100% free and open to everyone</strong> without placing annoying paywalls.
              </p>
            </section>

            {/* Section 2: Editorial Integrity Pledge */}
            <section className="space-y-4 pt-6 border-t border-[#E5E5E5] dark:border-[#262626]">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#111111] dark:text-white flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#F5A623]" />
                2. Our Editorial Independence & Ethics Pledge
              </h2>
              <p className="text-[#555555] dark:text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
                Our readers' trust is the single most valuable asset we have. We adhere to strict editorial standards:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626]">
                  <h3 className="font-bold text-sm text-[#111111] dark:text-white mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5A623]" /> Hands-On Testing
                  </h3>
                  <p className="text-xs text-[#555555] dark:text-[#A0A0A0] leading-relaxed">
                    We strictly test and benchmark software ourselves before publishing any recommendation.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626]">
                  <h3 className="font-bold text-sm text-[#111111] dark:text-white mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5A623]" /> Honest Pros & Cons
                  </h3>
                  <p className="text-xs text-[#555555] dark:text-[#A0A0A0] leading-relaxed">
                    If a tool has limitations, buggy workflows, or overpriced tiers, we state it plainly.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626]">
                  <h3 className="font-bold text-sm text-[#111111] dark:text-white mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5A623]" /> Zero Paid Fakes
                  </h3>
                  <p className="text-xs text-[#555555] dark:text-[#A0A0A0] leading-relaxed">
                    We never accept payment to give an inferior tool a positive review. Our opinions are always our own.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Programs We Participate In */}
            <section className="space-y-4 pt-6 border-t border-[#E5E5E5] dark:border-[#262626]">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#111111] dark:text-white">
                3. Affiliate Programs We Participate In
              </h2>
              <p className="text-[#555555] dark:text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
                Depending on the topic, articles on AIAndBeyond may contain affiliate links to services including, but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#555555] dark:text-[#A0A0A0] text-sm sm:text-base pl-2">
                <li><strong>Web Hosting & Cloud Services:</strong> Hostinger, DigitalOcean, Cloudways.</li>
                <li><strong>AI Software & Creative Tools:</strong> Canva, Midjourney guides, ChatGPT tool integrations, ElevenLabs, Runway.</li>
                <li><strong>Security & Privacy:</strong> NordVPN, Surfshark, password managers.</li>
                <li><strong>Online Learning & Courses:</strong> Coursera, Udemy, specialized technical certifications.</li>
                <li><strong>Automation & Workflow Tools:</strong> Make, Zapier, n8n hosting partners.</li>
              </ul>
            </section>

            {/* Section 4: Questions */}
            <section className="space-y-4 pt-6 border-t border-[#E5E5E5] dark:border-[#262626]">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#111111] dark:text-white">
                4. Questions Regarding Affiliates?
              </h2>
              <p className="text-[#555555] dark:text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
                If you have any questions regarding our affiliate partnerships, would like to inquire about a product review, or need clarification on a link, please reach out via our <Link to="/contact" className="text-[#F5A623] underline font-semibold">Contact Page</Link> or email us at <a href="mailto:affiliates@aiandbeyondtech.com" className="text-[#F5A623] font-semibold">affiliates@aiandbeyondtech.com</a>.
              </p>
            </section>

            {/* Back link */}
            <div className="pt-6 border-t border-[#E5E5E5] dark:border-[#262626] flex items-center justify-between">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5A623] hover:underline">
                <ArrowLeft size={16} /> Back to Home
              </Link>
              <Link to="/about" className="text-sm font-semibold text-[#555555] dark:text-[#A0A0A0] hover:text-[#111111] dark:hover:text-white">
                Learn About Our Team →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
