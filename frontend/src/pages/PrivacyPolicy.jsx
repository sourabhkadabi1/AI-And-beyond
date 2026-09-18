import React from 'react';
import { Shield, Lock, Eye, Mail, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  const lastUpdated = "September 18, 2026";

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 flex flex-col">
      {/* ── Top Header Banner (Translucent, Global Particles Flowing Behind) ── */}
      <div className="relative overflow-hidden bg-transparent border-b border-slate-200/60 dark:border-white/5 py-12 sm:py-16 transition-colors">
        {/* Ambient Glows */}
        <div className="absolute top-[-100px] right-[-60px] w-[500px] h-[500px] rounded-full bg-indigo-500/15 dark:bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-40px] w-[450px] h-[450px] rounded-full bg-cyan-500/10 dark:bg-cyan-600/15 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            {/* Top hairline reflection */}
            <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none" />

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 mb-4 shadow-xs">
              <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              LEGAL & TRANSPARENCY
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              How AIAndBeyond collects, protects, and respects your personal information.
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

            {/* Quick summary box */}
            <div className="p-6 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-slate-800 dark:text-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Consent & The Short Version
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                By using our website, you hereby consent to our Privacy Policy and agree to its terms. We believe in privacy by default: we only collect your email if you explicitly subscribe to our newsletter, we never sell your personal data to third parties, and all external links are monitored for safety.
              </p>
            </div>

            {/* Section 1: Overview */}
            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                1. Information We Collect & How We Use It
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                At <strong className="text-slate-950 dark:text-white">AIAndBeyond</strong> ("we", "us", or "our"), accessible at <span className="text-indigo-600 dark:text-indigo-400 font-medium">aiandbeyond.com</span>, one of our main priorities is the privacy of our visitors.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5">
                  <h3 className="font-bold text-sm text-slate-950 dark:text-white mb-1.5 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-500" /> Newsletter Information
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    When you voluntarily subscribe to our newsletter, we collect your email address solely to send you curated AI updates, tutorials, and articles. You can unsubscribe at any time with one click.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5">
                  <h3 className="font-bold text-sm text-slate-950 dark:text-white mb-1.5 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-cyan-500" /> Log Files & Analytics
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Like most modern websites, we collect standard non-personally identifiable log information: browser type, operating system, referring pages, date/time stamps, and basic interaction data to improve site speed and usability.
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-2">
                We use the information we collect to operate and maintain our website, improve and personalize user experience, understand how you interact with our pages, develop new products/services, and communicate with you regarding updates.
              </p>
            </section>

            {/* Section 2: Cookies & Web Beacons */}
            <section className="space-y-4 pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2.5">
                <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                2. Cookies, Web Beacons & Advertising Partners
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Like any other website, AIAndBeyond uses 'cookies'. These cookies are used to store information including visitors' preferences (such as Light/Dark mode), and the pages on the website that the visitor accessed or visited.
              </p>
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5 space-y-2">
                <h3 className="font-bold text-sm text-slate-950 dark:text-white">Google DoubleClick DART Cookie</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.
                </p>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links. Note that AIAndBeyond has no access to or control over these cookies that are used by third-party advertisers.
              </p>
            </section>

            {/* Section 3: Affiliate Links Disclosure */}
            <section className="space-y-4 pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                3. Affiliate Links & External Websites
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                AIAndBeyond participates in affiliate marketing programs. Some links to external products (e.g., Hostinger, Canva, NordVPN, Coursera, AI software) are affiliate links. If you click on an affiliate link and make a purchase, the merchant pays us a commission at <strong>no extra cost to you</strong>.
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                External websites are governed by their own independent privacy policies. We encourage you to review their policies when visiting third-party sites. For complete details, see our <Link to="/affiliate-disclosure" className="text-indigo-600 dark:text-indigo-400 underline font-semibold">Affiliate Disclosure</Link>.
              </p>
            </section>

            {/* Section 4: GDPR & CCPA Rights */}
            <section className="space-y-4 pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                4. Your Privacy Rights (GDPR & CCPA)
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                We respect your rights regarding your personal information. Depending on your location, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300 text-sm sm:text-base pl-2">
                <li><strong>Access:</strong> Request copies of personal data we hold about you.</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete information.</li>
                <li><strong>Erasure (Right to be Forgotten):</strong> Request that we delete your email or data from our subscriber records.</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time.</li>
              </ul>
            </section>

            {/* Section 5: Children's Information */}
            <section className="space-y-4 pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                5. Children's Privacy
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                AIAndBeyond does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe your child provided this kind of information on our website, please contact us immediately and we will promptly remove such records.
              </p>
            </section>

            {/* Section 6: Contact */}
            <section className="space-y-4 pt-6 border-t border-slate-200/80 dark:border-white/10">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                6. Contact Information
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                If you have questions about this Privacy Policy, your data rights, or site practices, reach out to us at:
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 inline-block text-sm">
                <p className="font-bold text-slate-950 dark:text-white">AIAndBeyond Privacy Team</p>
                <p className="text-slate-600 dark:text-slate-400">Email: <a href="mailto:privacy@aiandbeyond.com" className="text-indigo-600 dark:text-indigo-400 font-semibold">privacy@aiandbeyond.com</a></p>
                <p className="text-slate-600 dark:text-slate-400">Website: <Link to="/contact" className="text-indigo-600 dark:text-indigo-400 underline">Contact Page</Link></p>
              </div>
            </section>

            {/* Back link */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-white/10">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                <ArrowLeft size={16} /> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
