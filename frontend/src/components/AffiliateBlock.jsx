import { ExternalLink } from 'lucide-react'

export default function AffiliateBlock({ affiliate }) {
  if (!affiliate) return null
  return (
    <div className="my-8 rounded-xl border border-[#F5A623]/30 bg-[#F5A623]/5 p-5">
      <p className="text-xs text-[#555555] dark:text-[#A0A0A0] mb-3 uppercase tracking-wider font-semibold">Sponsored — Affiliate link</p>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-bold text-[#111111] dark:text-white">{affiliate.name}</h3>
            {affiliate.badge && (
              <span className="text-xs px-2 py-0.5 rounded-md bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30 font-semibold">
                {affiliate.badge}
              </span>
            )}
          </div>
          <p className="text-[#555555] dark:text-[#A0A0A0] text-sm leading-relaxed max-w-md">{affiliate.description}</p>
        </div>
        <a
          href={affiliate.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F5A623] hover:bg-[#e09510] text-black text-sm font-bold transition-colors whitespace-nowrap shadow-sm"
        >
          {affiliate.cta}
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
