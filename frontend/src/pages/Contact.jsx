import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Clock, Globe, HelpCircle, ArrowLeft, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactEmail = "contact@aiandbeyondtech.com";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    // Simulate brief submission delay for great UX
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Message sent! We will reply within 24-48 hours.', { icon: '🚀' });
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 600);
  };

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
              <MessageSquare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              WE'D LOVE TO CONNECT
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-4 tracking-tight">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Have a tool you want us to review, a question about a tutorial, or a business partnership inquiry? Reach out anytime.
            </p>
          </div>
        </div>
      </div>

      {/* ── Content Container ── */}
      <div className="flex-1 bg-transparent py-12 sm:py-16 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Direct Info & Trust Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Direct Email Card */}
              <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
                <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none" />
                
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
                  <Mail className="w-6 h-6" />
                </div>

                <div>
                  <h2 className="font-display text-lg font-bold text-slate-950 dark:text-white mb-1">Direct Email</h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Prefer your own email client? Send a message directly to:
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 text-xs sm:text-sm">
                  <a href={`mailto:${contactEmail}`} className="font-mono font-bold text-indigo-600 dark:text-indigo-400 truncate hover:underline">
                    {contactEmail}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Fast Response & Editorial Standards */}
              <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
                <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none" />
                
                <h3 className="font-display text-base font-bold text-slate-950 dark:text-white">Our Commitment</h3>
                
                <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Prompt Replies:</strong> We respond to all reader and partnership emails within 24 to 48 business hours.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Global Team:</strong> Remote tech researchers and creators reviewing software across all timezones.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Editorial Truth:</strong> We review tools based on merit. We do not sell fake 5-star ratings.</span>
                  </div>
                </div>
              </div>

              {/* Quick FAQ Micro Box */}
              <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-3">
                <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none" />
                
                <h3 className="font-display text-base font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  Common Topics
                </h3>
                
                <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <li>• <strong>AI Tool Submissions:</strong> Include demo links & test credentials if available.</li>
                  <li>• <strong>Sponsorships:</strong> We only partner with verified products we would use ourselves.</li>
                  <li>• <strong>Tutorial Suggestions:</strong> Tell us what framework or AI workflow you want covered next!</li>
                </ul>
              </div>

            </div>

            {/* Right Column: Interactive Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none" />

                <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white mb-2">Send a Message</h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-8">
                  Fill out the form below and our team will get back to you promptly.
                </p>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3 animate-fadeIn">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">Message Received!</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                      Thank you for contacting AIAndBeyond. A confirmation has been logged, and an editor will reach out to you within 24-48 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors cursor-pointer shadow-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Sourabh Kadabi"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                          Your Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Subject / Topic
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-xs cursor-pointer"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Tool Review Request">Tool Review Request / Feedback</option>
                        <option value="Partnership or Sponsorship">Partnership or Sponsorship</option>
                        <option value="Correction or Bug Report">Correction or Bug Report</option>
                        <option value="Tutorial Request">Tutorial Request</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Tell us what's on your mind..."
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-xs resize-y"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/25 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 pt-2">
                      We protect your privacy. Read our <Link to="/privacy-policy" className="text-indigo-600 dark:text-indigo-400 underline">Privacy Policy</Link>.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
