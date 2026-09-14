import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchPosts, subscribeNewsletter } from '../utils/api'
import { affiliates } from '../utils/affiliates'
import BlogCard from '../components/BlogCard'
import toast from 'react-hot-toast'
import { ArrowRight, Mail, ExternalLink, ImageIcon, BookOpen, Lightbulb, Rocket, Quote, FileText, CheckCircle2, Check } from 'lucide-react'

const CATEGORIES = [
  {
    name: 'AI Tools',
    color: '#5A50EE',
    desc: 'Discover cutting-edge AI software that saves time and boosts creativity',
    image: '/ai_tools.png'
  },
  {
    name: 'Web Hosting',
    color: '#0099BB',
    desc: 'Find the perfect hosting platform to launch your website or blog',
    image: '/web_hosting.png'
  },
  {
    name: 'AI Agents & Automation',
    color: '#FF8C42',
    desc: 'Next-gen autonomous agents, n8n workflows, and smart business automations',
    image: '/ai_automation.png'
  },
  {
    name: 'Tutorials',
    color: '#00B07D',
    desc: 'Step-by-step guides to master new tools and technologies',
    image: '/tutorials.png'
  },
  {
    name: 'Productivity',
    color: '#FF6B9D',
    desc: 'Smart workflows and apps to get more done in less time',
    image: '/productivity.png'
  },
  {
    name: 'MakeMoneyWithAI',
    color: '#16A34A',
    desc: 'Proven blueprints, side hustles, and monetizing intelligent AI systems',
    image: '/makemoneywithai.png'
  },
]

const spotlightAffiliates = [affiliates.hostinger, affiliates.canva, affiliates.nordvpn]

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [emailInput, setEmailInput] = useState('')
  const [submittingEmail, setSubmittingEmail] = useState(false)
  const [subscribedStatus, setSubscribedStatus] = useState(null)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!emailInput.trim() || submittingEmail) return
    try {
      setSubmittingEmail(true)
      const res = await subscribeNewsletter(emailInput.trim())
      if (res.data?.status === 'exists') {
        toast('You are already on our list!', { icon: '✨' })
      } else {
        toast.success('Welcome to AIAndBeyond!')
      }
      setSubscribedStatus(res.data?.message || 'Thank you for subscribing!')
      setEmailInput('')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Subscription failed. Please check your email.')
    } finally {
      setSubmittingEmail(false)
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchPosts(null, null, 0)
        setPosts(res.data?.slice(0, 3) || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION — Glassmorphism + Neural Constellation Particles
         ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pb-20 pt-8 sm:pt-12 border-b border-slate-200/60 dark:border-white/5 bg-transparent transition-colors duration-300">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold tracking-wide mb-6 shadow-xs backdrop-blur-xs">
                <Rocket className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>✨ YOUR AI & TECH COMPANION</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white leading-[1.12] mb-6 tracking-tight">
                Your Guide to <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">AI Tools</span> & What Comes Next.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl leading-relaxed font-normal">
                Honest reviews, practical tutorials, and curated tech essentials — tailored for students, creators, and professionals striving to stay ahead.
              </p>

              {/* High-Contrast Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Read the Blog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/blog" 
                  className="inline-flex items-center gap-2 px-8 py-3.5 glass-card glass-card-hover text-slate-800 dark:text-slate-100 font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                >
                  Browse Topics
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>500+ Curated Articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>100% Free Knowledge</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  <span>Weekly Fresh Trends</span>
                </div>
              </div>
            </div>

            {/* Hero Image / Visual Box */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-cyan-500/15 to-purple-500/15 rounded-3xl blur-2xl scale-105 pointer-events-none" />
              <div className="relative w-full aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 dark:border-white/10 glass-card flex items-center justify-center group">
                {/* Top hairline reflection */}
                <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none z-10" />
                <img
                  src="/hero.png"
                  alt="AI and Beyond Essentials"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full flex-col items-center justify-center p-6 text-center text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800">
                  <ImageIcon className="w-12 h-12 mb-2 text-indigo-600 dark:text-indigo-400 opacity-60" />
                  <p className="font-display font-bold text-slate-900 dark:text-white">Hero Visual Slot</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">1200 × 800px recommended</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS BAR — elevated credibility island (Anti-Glare)
         ═══════════════════════════════════════════════════════ */}
      <section className="relative -mt-10 sm:-mt-12 mb-10 z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl p-5 sm:p-7 glass-card relative overflow-hidden shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100/80 dark:border-indigo-800/40 hover:scale-[1.02] transition-transform">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                📚
              </div>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">100+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">Articles Published</p>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/40 border border-cyan-100/80 dark:border-cyan-800/40 hover:scale-[1.02] transition-transform">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
                ⚡
              </div>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">6</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">Expert Categories</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-100/80 dark:border-amber-800/40 hover:scale-[1.02] transition-transform">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-amber-600/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
                👥
              </div>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">10K+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">Monthly Readers</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100/80 dark:border-emerald-800/40 hover:scale-[1.02] transition-transform">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                🔥
              </div>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">Weekly</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">Fresh Drops</p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          LATEST POSTS — featured articles (Distinct Tinted Section)
         ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-slate-100/30 dark:bg-black/20 backdrop-blur-xs border-b border-slate-200/60 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/90 dark:border-indigo-800/70 mb-3 shadow-xs">
                FROM THE BLOG
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Latest Posts</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">Fresh guides, reviews, and tutorials</p>
            </div>
            <Link to="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:underline">
              View all posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden animate-pulse">
                  <div className="h-48 bg-slate-100 dark:bg-slate-800" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/4" />
                    <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug || post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-8 shadow-sm">
              <FileText className="w-12 h-12 mx-auto mb-4 text-indigo-600 dark:text-indigo-400 opacity-40" />
              <p className="text-lg font-bold text-slate-900 dark:text-white mb-2">No posts yet</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Create your first post from the admin dashboard!</p>
              <Link to="/admin" className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all">
                Go to Admin →
              </Link>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              View all posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          EXPLORE TOPICS — 3 + 2 layout with image previews (Pure White Section)
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-transparent border-b border-slate-200/60 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/90 dark:border-purple-800/70 mb-3 shadow-xs">
              CATEGORIES
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">Explore Topics</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Dive into our six specialized categories designed to upgrade your technical toolkit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/blog?category=${encodeURIComponent(cat.name)}`}
                className="group block rounded-3xl glass-card glass-card-hover relative overflow-hidden transition-all duration-300"
              >
                {/* Top hairline reflection */}
                <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none z-10" />

                {/* Image slot */}
                <div className="h-44 overflow-hidden relative bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-white/10">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full flex-col items-center justify-center p-3 text-center" style={{ backgroundColor: `${cat.color}15` }}>
                    <ImageIcon className="w-8 h-8 mb-1" style={{ color: cat.color }} />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{cat.name} Visual</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">800 × 500 px</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-bold" style={{ color: cat.color }}>
                    Explore Category <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS — 3-step visual workflow (Distinct Tinted Section)
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-slate-100/30 dark:bg-black/20 backdrop-blur-xs border-b border-slate-200/60 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/90 dark:border-emerald-800/70 mb-3 shadow-xs">
              OUR PROCESS
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">How It Works</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">Three simple steps to level up your technical mastery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: BookOpen,
                color: '#5A50EE',
                step: '01',
                title: 'Read & Research',
                desc: 'Explore hands-on breakdowns of modern AI software, servers, and tech breakthroughs written in accessible terms.'
              },
              {
                icon: Lightbulb,
                color: '#FF8C42',
                step: '02',
                title: 'Learn by Doing',
                desc: 'Follow straightforward step-by-step guides and honest reviews without fluff or sponsored jargon.'
              },
              {
                icon: Rocket,
                color: '#00B07D',
                step: '03',
                title: 'Build & Scale',
                desc: 'Implement solutions directly in your projects, accelerate your workflow, and launch with high confidence.'
              }
            ].map((item) => (
              <div 
                key={item.step} 
                className="relative text-center p-8 rounded-3xl glass-card glass-card-hover overflow-hidden transition-all duration-300"
              >
                {/* Top hairline reflection */}
                <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none z-10" />
                <div 
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: item.color }}
                >
                  Step {item.step}
                </div>
                <div 
                  className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center shadow-inner"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2.5">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          AFFILIATE SPOTLIGHT — with guaranteed button visibility (Pure White Section)
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-transparent border-b border-slate-200/60 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200/90 dark:border-cyan-800/70 mb-3 shadow-xs">
              RECOMMENDED STACK
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">Tools We Actually Use</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Battle-tested services powering our workflow. Every single tool is tested and approved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {spotlightAffiliates.map((aff) => {
              if (!aff) return null
              return (
                <div 
                  key={aff.name} 
                  className="rounded-3xl glass-card glass-card-hover relative overflow-hidden flex flex-col transition-all duration-300"
                >
                  {/* Top hairline reflection */}
                  <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none z-10" />

                  {/* Image slot */}
                  <div className="h-44 overflow-hidden relative bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-white/10">
                    {aff.image ? (
                      <img src={aff.image} alt={aff.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
                        <ImageIcon className="w-8 h-8 mb-1 text-indigo-600 dark:text-indigo-400 opacity-60" />
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{aff.name} Slot</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">800 × 500 px</p>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">{aff.name}</h3>
                      {aff.badge && (
                        <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-bold rounded-full">
                          {aff.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed flex-1 mb-6">{aff.description}</p>
                    
                    {/* Guaranteed High-Contrast CTA Button */}
                    <a
                      href={aff.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-600/25 cursor-pointer active:scale-98"
                    >
                      <span>{aff.cta}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIAL / SOCIAL PROOF — with visible avatar (Distinct Tinted Section)
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-slate-100/30 dark:bg-black/20 backdrop-blur-xs border-b border-slate-200/60 dark:border-white/5 transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl text-center">
            {/* Top hairline reflection */}
            <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none" />
            
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/90 dark:border-amber-800/70 mb-6 shadow-xs">
              COMMUNITY TRUST
            </div>
            <Quote className="w-10 h-10 text-indigo-600 dark:text-indigo-400 opacity-40 mx-auto mb-6 rotate-180" />
            <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-slate-950 dark:text-white leading-relaxed mb-6">
              "AIAndBeyond is my go-to hub whenever I need to evaluate software or understand a new AI framework without the marketing hype."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              {/* Guaranteed Solid Gradient Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                AB
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-slate-950 dark:text-white">Alex Bennett</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Software Engineer & Tech Creator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          NEWSLETTER SECTION (Pure White Section)
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-transparent transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl shadow-indigo-600/30 border border-white/20">
            {/* Top hairline reflection */}
            <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none" />
            {/* Ambient circular backdrop */}
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mx-auto mb-5 border border-white/20">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
                Stay Ahead of the Curve
              </h2>
              <p className="text-sm sm:text-base text-white/90 max-w-lg mx-auto mb-2 leading-relaxed font-normal">
                Receive our hand-picked AI tools, actionable tutorials, and unbiased reviews straight in your inbox.
              </p>
              <p className="text-xs text-white/70 mb-8 font-medium">
                Join 1,000+ readers · Zero spam · Unsubscribe anytime
              </p>
              {subscribedStatus ? (
                <div className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-sm shadow-lg animate-fadeIn">
                  <Check className="w-5 h-5 text-emerald-300" />
                  <span>{subscribedStatus}</span>
                </div>
              ) : (
                <form 
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" 
                  onSubmit={handleSubscribe}
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    disabled={submittingEmail}
                    className="flex-grow px-4 py-3 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white bg-white text-slate-900 placeholder-slate-500 shadow-md text-sm font-medium disabled:opacity-60"
                    required
                  />
                  <button
                    type="submit"
                    disabled={submittingEmail}
                    className="px-6 py-3 bg-slate-950 hover:bg-black text-white font-bold text-sm rounded-xl transition-all whitespace-nowrap shadow-lg cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submittingEmail ? 'Subscribing...' : 'Join Free'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
