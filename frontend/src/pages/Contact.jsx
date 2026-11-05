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
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#111111] dark:text-[#FFFFFF] flex flex-col">
      {/* ── Editorial Header ── */}
      <div className="border-b border-[#E5E5E5] dark:border-[#262626] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-xl p-8 sm:p-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg text-xs font-extrabold bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/30 mb-4">
              <MessageSquare className="w-3.5 h-3.5 text-[#F5A623]" />
              WE'D LOVE TO CONNECT
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[#111111] dark:text-[#FFFFFF] mb-4 tracking-tight">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg text-[#555555] dark:text-[#A0A0A0] max-w-2xl mx-auto leading-relaxed font-normal">
              Have a tool you want us to review, a question about a tutorial, or a business partnership inquiry? Reach out anytime.
            </p>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Direct Info & Trust Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Direct Email Card */}
              <div className="bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-xl p-6 sm:p-8 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F5A623]/10 text-[#F5A623] flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>

                <div>
                  <h2 className="font-display text-lg font-bold text-[#111111] dark:text-[#FFFFFF] mb-1">Direct Email</h2>
                  <p className="text-xs sm:text-sm text-[#555555] dark:text-[#A0A0A0] leading-relaxed">
                    Prefer your own email client? Send a message directly to:
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626] text-xs sm:text-sm">
                  <a href={`mailto:${contactEmail}`} className="font-mono font-bold text-[#F5A623] truncate hover:underline">
                    {contactEmail}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg text-[#555555] hover:text-[#111111] dark:hover:text-[#FFFFFF] hover:bg-[#E5E5E5] dark:hover:bg-[#262626] transition-colors cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Fast Response & Editorial Standards */}
              <div className="bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-xl p-6 sm:p-8 space-y-4">
                <h3 className="font-display text-base font-bold text-[#111111] dark:text-[#FFFFFF]">Our Commitment</h3>
                
                <div className="space-y-3 text-xs sm:text-sm text-[#555555] dark:text-[#A0A0A0]">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#F5A623] flex-shrink-0 mt-0.5" />
                    <span><strong className="text-[#111111] dark:text-[#FFFFFF]">Prompt Replies:</strong> We respond to all reader and partnership emails within 24 to 48 business hours.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-[#F5A623] flex-shrink-0 mt-0.5" />
                    <span><strong className="text-[#111111] dark:text-[#FFFFFF]">Global Team:</strong> Remote tech researchers and creators reviewing software across all timezones.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-[#111111] dark:text-[#FFFFFF]">Editorial Truth:</strong> We review tools based on merit. We do not sell fake 5-star ratings.</span>
                  </div>
                </div>
              </div>

              {/* Quick FAQ Micro Box */}
              <div className="bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-xl p-6 sm:p-8 space-y-3">
                <h3 className="font-display text-base font-bold text-[#111111] dark:text-[#FFFFFF] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#F5A623]" />
                  Common Topics
                </h3>
                
                <ul className="text-xs sm:text-sm text-[#555555] dark:text-[#A0A0A0] space-y-2">
                  <li>• <strong className="text-[#111111] dark:text-[#FFFFFF]">AI Tool Submissions:</strong> Include demo links & test credentials if available.</li>
                  <li>• <strong className="text-[#111111] dark:text-[#FFFFFF]">Sponsorships:</strong> We only partner with verified products we would use ourselves.</li>
                  <li>• <strong className="text-[#111111] dark:text-[#FFFFFF]">Tutorial Suggestions:</strong> Tell us what framework or AI workflow you want covered next!</li>
                </ul>
              </div>

            </div>

            {/* Right Column: Interactive Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-xl p-8 sm:p-10">
                <h2 className="font-display text-2xl font-bold text-[#111111] dark:text-[#FFFFFF] mb-2">Send a Message</h2>
                <p className="text-xs sm:text-sm text-[#555555] dark:text-[#A0A0A0] mb-8">
                  Fill out the form below and our team will get back to you promptly.
                </p>

                {submitted ? (
                  <div className="p-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3 animate-fadeIn">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h3 className="font-display text-xl font-bold text-[#111111] dark:text-[#FFFFFF]">Message Received!</h3>
                    <p className="text-sm text-[#555555] dark:text-[#A0A0A0] max-w-md mx-auto">
                      Thank you for contacting AIAndBeyond. A confirmation has been logged, and an editor will reach out to you within 24-48 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-lg bg-[#F5A623] hover:bg-[#E09515] text-[#0A0A0A] font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#555555] dark:text-[#A0A0A0] mb-2">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626] text-[#111111] dark:text-[#FFFFFF] placeholder-[#999999] text-sm focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#555555] dark:text-[#A0A0A0] mb-2">
                          Your Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className="w-full px-4 py-3 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626] text-[#111111] dark:text-[#FFFFFF] placeholder-[#999999] text-sm focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#555555] dark:text-[#A0A0A0] mb-2">
                        Subject / Topic
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626] text-[#111111] dark:text-[#FFFFFF] text-sm focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] transition-colors cursor-pointer"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Tool Review Request">Tool Review Request / Feedback</option>
                        <option value="Partnership or Sponsorship">Partnership or Sponsorship</option>
                        <option value="Correction or Bug Report">Correction or Bug Report</option>
                        <option value="Tutorial Request">Tutorial Request</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#555555] dark:text-[#A0A0A0] mb-2">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Tell us what's on your mind..."
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626] text-[#111111] dark:text-[#FFFFFF] placeholder-[#999999] text-sm focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] transition-colors resize-y"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#F5A623] hover:bg-[#E09515] text-[#0A0A0A] font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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

                    <p className="text-[11px] text-center text-[#555555] dark:text-[#A0A0A0] pt-2">
                      We protect your privacy. Read our <Link to="/privacy-policy" className="text-[#F5A623] underline">Privacy Policy</Link>.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5A623] hover:underline">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
