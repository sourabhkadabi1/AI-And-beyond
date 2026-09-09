import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchPosts } from '../utils/api'
import { affiliates } from '../utils/affiliates'
import BlogCard from '../components/BlogCard'
import { ArrowRight, Mail, ExternalLink, ImageIcon, BookOpen, Lightbulb, Rocket, Quote, FileText, CheckCircle2 } from 'lucide-react'

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
    name: 'Tech Reviews',
    color: '#FF8C42',
    desc: 'Honest, hands-on reviews of the latest gadgets and software',
    image: '/tech_reviews.png'
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
]

const spotlightAffiliates = [affiliates.hostinger, affiliates.canva, affiliates.nordvpn]

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

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
    <div className="bg-slate-50 dark:bg-[#080C14] min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION — gradient glow + hero image
         ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#080C14]">
        {/* Subtle Ambient Background Blobs */}
        <div className="absolute top-[-100px] right-[-60px] w-[450px] h-[450px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-40px] w-[400px] h-[400px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-6 shadow-sm">
                <Rocket className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Your AI & Tech Companion</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.12] mb-6 tracking-tight">
                Your Guide to <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">AI Tools</span> & What Comes Next.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl leading-relaxed font-normal">
                Honest reviews, practical tutorials, and curated tech essentials — tailored for students, creators, and professionals striving to stay ahead.
              </p>

              {/* High-Contrast Hero Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Read the Blog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/blog" 
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-100 dark:border-slate-700 font-bold rounded-xl transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer"
                >
                  Browse Topics
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
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
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-cyan-500/15 to-pink-500/15 rounded-3xl blur-2xl scale-105" />
              <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center group">
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
          STATS BAR — credibility strip
         ═══════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-display text-3xl font-bold text-indigo-600 dark:text-indigo-400">100+</p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-semibold">Articles Published</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-cyan-600 dark:text-cyan-400">5</p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-semibold">Expert Categories</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-amber-500">10K+</p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-semibold">Monthly Readers</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-emerald-500">Weekly</p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-semibold">Fresh Drops</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          LATEST POSTS — featured articles
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 dark:bg-[#080C14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">From the Blog</div>
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
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-pulse">
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
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
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
          EXPLORE TOPICS — 3 + 2 layout with image previews
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">Categories</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">Explore Topics</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Dive into our five specialized categories designed to upgrade your technical toolkit.
            </p>
          </div>

          {/* Row 1: 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {CATEGORIES.slice(0, 3).map((cat) => (
              <Link
                key={cat.name}
                to={`/blog?category=${encodeURIComponent(cat.name)}`}
                className="group block bg-slate-50 hover:bg-white dark:bg-slate-950 dark:hover:bg-[#0F1626] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image slot */}
                <div className="h-44 overflow-hidden relative bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
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

          {/* Row 2: 2 cards centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {CATEGORIES.slice(3, 5).map((cat) => (
              <Link
                key={cat.name}
                to={`/blog?category=${encodeURIComponent(cat.name)}`}
                className="group block bg-slate-50 hover:bg-white dark:bg-slate-950 dark:hover:bg-[#0F1626] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="h-44 overflow-hidden relative bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
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
          HOW IT WORKS — 3-step visual workflow
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 dark:bg-[#080C14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">Our Process</div>
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
                className="relative text-center p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300"
              >
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
          AFFILIATE SPOTLIGHT — with guaranteed button visibility
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">Recommended Stack</div>
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
                  className="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-indigo-500/40 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Image slot */}
                  <div className="h-44 overflow-hidden relative bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
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
          TESTIMONIAL / SOCIAL PROOF — with visible avatar
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 dark:bg-[#080C14]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-10 h-10 text-indigo-600 dark:text-indigo-400 opacity-40 mx-auto mb-6 rotate-180" />
          <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white leading-relaxed mb-6">
            "AIAndBeyond is my go-to hub whenever I need to evaluate software or understand a new AI framework without the marketing hype."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            {/* Guaranteed Solid Gradient Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
              AB
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-slate-900 dark:text-white">Alex Bennett</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Software Engineer & Tech Creator</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          NEWSLETTER SECTION
         ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl shadow-indigo-600/20 border border-white/10">
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
              <form 
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to AIAndBeyond!');
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-3 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white bg-white text-slate-900 placeholder-slate-500 shadow-md text-sm font-medium"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-slate-950 hover:bg-black text-white font-bold text-sm rounded-xl transition-colors whitespace-nowrap shadow-lg cursor-pointer active:scale-95"
                >
                  Join Free
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
