import { Link } from 'react-router-dom'
import { Calendar, Clock } from 'lucide-react'

const categoryColors = {
  "AI Tools":        "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800",
  "Web Hosting":     "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50 border-cyan-200 dark:border-cyan-800",
  "AI Agents & Automation": "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800",
  "Tutorials":       "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800",
  "Productivity":    "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/50 border-pink-200 dark:border-pink-800",
  "MakeMoneyWithAI": "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800",
}

function readTime(content) {
  const words = content?.split(' ').length || 0
  return Math.max(1, Math.ceil(words / 200))
}

export default function BlogCard({ post }) {
  const colorClass = categoryColors[post.category] || "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800"

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-2xl glass-card glass-card-hover relative overflow-hidden transition-all duration-300"
    >
      {/* Top hairline reflection */}
      <div className="absolute inset-x-0 top-0 h-px glow-streak pointer-events-none z-10" />

      {post.cover_image && (
        <div className="h-48 overflow-hidden bg-slate-100/50 dark:bg-slate-900/50 relative">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {!post.cover_image && (
        <div className="h-40 bg-slate-100/40 dark:bg-slate-900/40 flex items-center justify-center">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${colorClass}`}>
            {post.category}
          </span>
        </div>
      )}

      <div className="p-5">
        {post.cover_image && (
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${colorClass} mb-3 inline-block shadow-2xs`}>
            {post.category}
          </span>
        )}

        <h2 className="font-display font-bold text-slate-950 dark:text-white text-lg leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 font-normal">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-xs pt-3 border-t border-slate-200/80 dark:border-white/10">
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar size={13} className="opacity-70" />
            {new Date(post.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Clock size={13} className="opacity-70" />
            {readTime(post.excerpt || post.content)} min read
          </span>
        </div>
      </div>
    </Link>
  )
}
