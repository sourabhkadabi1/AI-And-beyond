import { Link } from 'react-router-dom'
import { Calendar, Clock } from 'lucide-react'
import { optimizeImageUrl } from '../utils/image'

function readTime(content) {
  const words = content?.split(' ').length || 0
  return Math.max(1, Math.ceil(words / 200))
}

export default function BlogCard({ post }) {
  const optimizedCover = post.cover_image ? optimizeImageUrl(post.cover_image, { width: 600 }) : null

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-xl bg-white dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] hover:border-[#F5A623]/50 overflow-hidden transition-all duration-300"
    >
      {optimizedCover && (
        <div className="h-48 overflow-hidden bg-[#F5F5F5] dark:bg-[#1C1C1C] relative aspect-[16/9]">
          <img
            src={optimizedCover}
            alt={post.title}
            loading="lazy"
            decoding="async"
            width="400"
            height="192"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {!optimizedCover && (
        <div className="h-40 bg-[#F5F5F5] dark:bg-[#1C1C1C] flex items-center justify-center">
          <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/20">
            {post.category}
          </span>
        </div>
      )}

      <div className="p-5">
        {optimizedCover && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/20 mb-3 inline-block">
            {post.category}
          </span>
        )}

        <h2 className="font-display font-bold text-[#111111] dark:text-white text-lg leading-snug group-hover:text-[#F5A623] transition-colors line-clamp-2 mb-2">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-[#555555] dark:text-[#A0A0A0] text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-4 text-[#999999] dark:text-[#666666] text-xs pt-3 border-t border-[#E5E5E5] dark:border-[#262626]">
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar size={13} />
            {new Date(post.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Clock size={13} />
            {readTime(post.excerpt || post.content)} min read
          </span>
        </div>
      </div>
    </Link>
  )
}
