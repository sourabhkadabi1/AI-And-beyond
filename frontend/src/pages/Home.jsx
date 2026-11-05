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
    image: '/ai_tools.webp'
  },
  {
    name: 'Web Hosting',
    color: '#0099BB',
    desc: 'Find the perfect hosting platform to launch your website or blog',
    image: '/web_hosting.webp'
  },
  {
    name: 'AI Agents & Automation',
    color: '#FF8C42',
    desc: 'Next-gen autonomous agents, n8n workflows, and smart business automations',
    image: '/ai_automation.webp'
  },
  {
    name: 'Tutorials',
    color: '#00B07D',
    desc: 'Step-by-step guides to master new tools and technologies',
    image: '/tutorials.webp'
  },
  {
    name: 'Productivity',
    color: '#FF6B9D',
    desc: 'Smart workflows and apps to get more done in less time',
    image: '/productivity.webp'
  },
  {
    name: 'MakeMoneyWithAI',
    color: '#16A34A',
    desc: 'Proven blueprints, side hustles, and monetizing intelligent AI systems',
    image: '/makemoneywithai.webp'
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
    <div className="min-h-screen text-[#111111] dark:text-[#FFFFFF] transition-colors duration-200">

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="relative pb-20 pt-8 sm:pt-12 border-b border-[#E5E5E5] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-300">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#555555] dark:text-[#A0A0A0] mb-6">
                Your AI & Tech Companion
              </p>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] dark:text-white leading-[1.12] mb-6 tracking-tight">
                Your Guide to <span className="text-[#F5A623]">AI Tools</span> & What Comes Next.
              </h1>

              <p className="text-base sm:text-lg text-[#555555] dark:text-[#A0A0A0] mb-8 max-w-xl leading-relaxed font-normal">
                Honest reviews, practical tutorials, and curated tech essentials — tailored for students, creators, and professionals striving to stay ahead.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F5A623] hover:bg-[#e09510] text-black font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                >
                  <span>Read the Blog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/blog" 
                  className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#E5E5E5] dark:border-[#262626] hover:border-[#F5A623] dark:hover:border-[#F5A623] text-[#111111] dark:text-[#FFFFFF] font-bold rounded-xl transition-all active:scale-95 cursor-pointer bg-transparent"
                >
                  Browse Topics
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#E5E5E5] dark:border-[#262626] text-xs font-medium text-[#555555] dark:text-[#A0A0A0]">
                <span>500+ Curated Articles</span>
                <span className="hidden sm:inline text-[#E5E5E5] dark:text-[#262626]">·</span>
                <span>100% Free Knowledge</span>
                <span className="hidden sm:inline text-[#E5E5E5] dark:text-[#262626]">·</span>
                <span>Weekly Fresh Trends</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden border border-[#E5E5E5] dark:border-[#262626] flex items-center justify-center group bg-[#F5F5F5] dark:bg-[#141414]">
                <img
                  src="/hero.webp"
                  alt="AI and Beyond Essentials"
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full flex-col items-center justify-center p-6 text-center text-[#555555] dark:text-[#A0A0A0] bg-[#F5F5F5] dark:bg-[#141414]">
                  <ImageIcon className="w-12 h-12 mb-2 text-[#F5A623] opacity-60" />
                  <p className="font-display font-bold text-[#111111] dark:text-white">Hero Visual Slot</p>
                  <p className="text-xs text-[#555555] dark:text-[#A0A0A0] mt-1">1200 × 800px recommended</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS BAR
         ═══════════════════════════════════════════════════════ */}
      <section className="relative -mt-10 sm:-mt-12 mb-10 z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-xl p-5 sm:p-7 bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] relative overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            
            {[
              { value: '100+', label: 'Articles Published' },
              { value: '6', label: 'Expert Categories' },
              { value: '10K+', label: 'Monthly Readers' },
              { value: 'Weekly', label: 'Fresh Drops' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-lg">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#F5A623]">{stat.value}</p>
                <p className="text-xs sm:text-sm font-medium text-[#555555] dark:text-[#A0A0A0] mt-1">{stat.label}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          LATEST POSTS
         ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#F5F5F5] dark:bg-[#0A0A0A] border-b border-[#E5E5E5] dark:border-[#262626] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white">Latest Posts</h2>
              <p className="text-[#555555] dark:text-[#A0A0A0] text-sm sm:text-base mt-1">Fresh guides, reviews, and tutorials</p>
            </div>
            <Link to="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-[#F5A623] font-bold text-sm hover:underline">
              View all posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-[#FFFFFF] dark:bg-[#141414] rounded-xl border border-[#E5E5E5] dark:border-[#262626] overflow-hidden animate-pulse">
                  <div className="h-48 bg-[#F5F5F5] dark:bg-[#1C1C1C]" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded w-1/4" />
                    <div className="h-6 bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded w-3/4" />
                    <div className="h-4 bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded w-full" />
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
            <div className="text-center py-16 bg-[#FFFFFF] dark:bg-[#141414] rounded-xl border border-[#E5E5E5] dark:border-[#262626] p-8">
              <FileText className="w-12 h-12 mx-auto mb-4 text-[#F5A623] opacity-40" />
              <p className="text-lg font-bold text-[#111111] dark:text-white mb-2">No posts yet</p>
              <p className="text-sm text-[#555555] dark:text-[#A0A0A0]">Create your first post from the admin dashboard!</p>
              <Link to="/admin" className="inline-block mt-4 px-5 py-2.5 rounded-lg bg-[#F5A623] hover:bg-[#e09510] text-black text-xs font-bold transition-all">
                Go to Admin →
              </Link>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-[#F5A623] font-bold text-sm">
              View all posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          EXPLORE TOPICS
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-[#FAFAFA] dark:bg-[#0A0A0A] border-b border-[#E5E5E5] dark:border-[#262626] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#555555] dark:text-[#A0A0A0] mb-3">Categories</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white mb-3">Explore Topics</h2>
            <p className="text-[#555555] dark:text-[#A0A0A0] text-sm sm:text-base max-w-xl mx-auto">
              Dive into our six specialized categories designed to upgrade your technical toolkit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/blog?category=${encodeURIComponent(cat.name)}`}
                className="group block rounded-xl bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] hover:border-[#F5A623] dark:hover:border-[#F5A623] relative overflow-hidden transition-all duration-300"
              >
                {/* Image slot */}
                <div className="h-44 overflow-hidden relative bg-[#F5F5F5] dark:bg-[#1C1C1C] border-b border-[#E5E5E5] dark:border-[#262626]">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full flex-col items-center justify-center p-3 text-center bg-[#F5F5F5] dark:bg-[#1C1C1C]">
                    <ImageIcon className="w-8 h-8 mb-1 text-[#F5A623]" />
                    <span className="text-xs font-bold text-[#111111] dark:text-white">{cat.name} Visual</span>
                    <span className="text-[10px] text-[#555555] dark:text-[#A0A0A0]">800 × 500 px</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-[#111111] dark:text-white group-hover:text-[#F5A623] transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555555] dark:text-[#A0A0A0] leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#F5A623]">
                    Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-[#F5F5F5] dark:bg-[#0A0A0A] border-b border-[#E5E5E5] dark:border-[#262626] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#555555] dark:text-[#A0A0A0] mb-3">Our Process</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white mb-3">How It Works</h2>
            <p className="text-[#555555] dark:text-[#A0A0A0] text-sm sm:text-base">Three simple steps to level up your technical mastery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: BookOpen,
                step: '01',
                title: 'Read & Research',
                desc: 'Explore hands-on breakdowns of modern AI software, servers, and tech breakthroughs written in accessible terms.'
              },
              {
                icon: Lightbulb,
                step: '02',
                title: 'Learn by Doing',
                desc: 'Follow straightforward step-by-step guides and honest reviews without fluff or sponsored jargon.'
              },
              {
                icon: Rocket,
                step: '03',
                title: 'Build & Scale',
                desc: 'Implement solutions directly in your projects, accelerate your workflow, and launch with high confidence.'
              }
            ].map((item) => (
              <div 
                key={item.step} 
                className="relative text-center p-8 rounded-xl bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] hover:border-[#F5A623] dark:hover:border-[#F5A623] transition-all duration-300"
              >
                <span className="inline-block text-[#F5A623] font-display text-sm font-extrabold tracking-wider mb-4">
                  Step {item.step}
                </span>
                <div className="w-14 h-14 mx-auto mb-5 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-[#F5A623]" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#111111] dark:text-white mb-2.5">{item.title}</h3>
                <p className="text-[#555555] dark:text-[#A0A0A0] text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          AFFILIATE SPOTLIGHT
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-[#FAFAFA] dark:bg-[#0A0A0A] border-b border-[#E5E5E5] dark:border-[#262626] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#555555] dark:text-[#A0A0A0] mb-3">Recommended Stack</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111111] dark:text-white mb-3">Tools We Actually Use</h2>
            <p className="text-[#555555] dark:text-[#A0A0A0] text-sm sm:text-base max-w-xl mx-auto">
              Battle-tested services powering our workflow. Every single tool is tested and approved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {spotlightAffiliates.map((aff) => {
              if (!aff) return null
              return (
                <div 
                  key={aff.name} 
                  className="rounded-xl bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] hover:border-[#F5A623] dark:hover:border-[#F5A623] relative overflow-hidden flex flex-col transition-all duration-300"
                >
                  {/* Image slot */}
                  <div className="h-44 overflow-hidden relative bg-[#F5F5F5] dark:bg-[#1C1C1C] border-b border-[#E5E5E5] dark:border-[#262626]">
                    {aff.image ? (
                      <img src={aff.image} alt={aff.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
                        <ImageIcon className="w-8 h-8 mb-1 text-[#F5A623] opacity-60" />
                        <p className="text-xs font-bold text-[#111111] dark:text-white">{aff.name} Slot</p>
                        <p className="text-[10px] text-[#555555] dark:text-[#A0A0A0]">800 × 500 px</p>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display text-xl font-bold text-[#111111] dark:text-white">{aff.name}</h3>
                      {aff.badge && (
                        <span className="px-2.5 py-0.5 bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/20 text-[11px] font-bold rounded-full">
                          {aff.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[#555555] dark:text-[#A0A0A0] text-xs sm:text-sm leading-relaxed flex-1 mb-6">{aff.description}</p>
                    
                    <a
                      href={aff.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-[#F5A623] hover:bg-[#e09510] text-black font-bold text-xs sm:text-sm rounded-lg transition-all cursor-pointer active:scale-95"
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
          TESTIMONIAL
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-[#F5F5F5] dark:bg-[#0A0A0A] border-b border-[#E5E5E5] dark:border-[#262626] transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-xl p-8 sm:p-12 relative overflow-hidden text-center">
            
            <Quote className="w-10 h-10 text-[#F5A623] opacity-50 mx-auto mb-6 rotate-180" />
            <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#111111] dark:text-white leading-relaxed mb-6">
              "AIAndBeyond is my go-to hub whenever I need to evaluate software or understand a new AI framework without the marketing hype."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5A623] flex items-center justify-center text-black font-extrabold text-sm">
                AB
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-[#111111] dark:text-white">Alex Bennett</p>
                <p className="text-xs text-[#555555] dark:text-[#A0A0A0] font-medium">Software Engineer & Tech Creator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          NEWSLETTER SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111111] dark:bg-[#141414] border border-[#262626] text-white rounded-xl p-8 sm:p-14 text-center relative overflow-hidden">

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-[#1C1C1C] border border-[#262626] flex items-center justify-center mx-auto mb-5">
                <Mail className="w-6 h-6 text-[#F5A623]" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
                Stay Ahead of the Curve
              </h2>
              <p className="text-sm sm:text-base text-[#A0A0A0] max-w-lg mx-auto mb-2 leading-relaxed font-normal">
                Receive our hand-picked AI tools, actionable tutorials, and unbiased reviews straight in your inbox.
              </p>
              <p className="text-xs text-[#A0A0A0]/70 mb-8 font-medium">
                Join 1,000+ readers · Zero spam · Unsubscribe anytime
              </p>
              {subscribedStatus ? (
                <div className="inline-flex items-center gap-2.5 px-6 py-4 rounded-lg bg-[#1C1C1C] border border-[#262626] text-white font-bold text-sm animate-fadeIn">
                  <Check className="w-5 h-5 text-[#F5A623]" />
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
                    className="flex-grow px-4 py-3 rounded-lg border border-[#262626] focus:outline-none focus:ring-2 focus:ring-[#F5A623] bg-[#1C1C1C] text-white placeholder-[#555555] text-sm font-medium disabled:opacity-60"
                    required
                  />
                  <button
                    type="submit"
                    disabled={submittingEmail}
                    className="px-6 py-3 bg-[#F5A623] hover:bg-[#e09510] text-black font-bold text-sm rounded-lg transition-all whitespace-nowrap cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
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
