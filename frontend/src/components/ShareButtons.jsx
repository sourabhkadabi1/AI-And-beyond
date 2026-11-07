import { Link2, Check } from 'lucide-react'
import { useState } from 'react'

export default function ShareButtons({ title, url, image }) {
  const [copied, setCopied] = useState(false)
  const fullUrl = `https://aiandbeyondtech.com/blog/${url}`

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const mediaParam = image ? `&media=${encodeURIComponent(image)}` : ''
  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(fullUrl)}${mediaParam}&description=${encodeURIComponent(title)}`

  return (
    <div className="flex items-center gap-3">
      <span className="text-[#555555] dark:text-[#A0A0A0] text-sm font-medium">Share:</span>
      <a href={pinterestUrl} target="_blank" rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-lg bg-[#E60023]/10 text-[#E60023] border border-[#E60023]/25 text-sm hover:bg-[#E60023]/20 transition-colors font-medium">
        Pinterest
      </a>
      <button onClick={copyLink}
        className="px-3 py-1.5 rounded-lg bg-[#F5F5F5] dark:bg-[#1C1C1C] text-[#555555] dark:text-[#A0A0A0] border border-[#E5E5E5] dark:border-[#262626] text-sm hover:border-[#F5A623] hover:text-[#111111] dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
        {copied ? <Check size={14} className="text-emerald-500" /> : <Link2 size={14} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
