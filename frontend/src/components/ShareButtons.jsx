import { Link2, Check } from 'lucide-react'
import { useState } from 'react'

export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false)
  const fullUrl = `https://aiandbeyondtech.com/blog/${url}`

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(fullUrl)}&description=${encodeURIComponent(title)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`

  return (
    <div className="flex items-center gap-3">
      <span className="text-text-2 text-sm">Share:</span>
      <a href={pinterestUrl} target="_blank" rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-lg bg-[#E6002310] text-[#E60023] border border-[#E6002325] text-sm hover:bg-[#E6002320] transition-colors">
        Pinterest
      </a>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-lg bg-[#F5F5FF] text-text-2 border border-dark-border text-sm hover:border-accent/50 transition-colors">
        𝕏
      </a>
      <button onClick={copyLink}
        className="px-3 py-1.5 rounded-lg bg-[#F5F5FF] text-text-2 border border-dark-border text-sm hover:border-accent/50 transition-colors flex items-center gap-1.5">
        {copied ? <Check size={14} className="text-green-500" /> : <Link2 size={14} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
