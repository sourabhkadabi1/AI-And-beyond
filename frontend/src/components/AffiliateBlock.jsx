import { ExternalLink } from 'lucide-react'

export default function AffiliateBlock({ affiliate }) {
  if (!affiliate) return null
  return (
    <div className="my-8 rounded-xl border border-accent/30 bg-accent/5 p-5">
      <p className="text-xs text-text-2 mb-3 uppercase tracking-wide">Sponsored — Affiliate link</p>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-semibold text-text-1">{affiliate.name}</h3>
            {affiliate.badge && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                {affiliate.badge}
              </span>
            )}
          </div>
          <p className="text-text-2 text-sm leading-relaxed max-w-md">{affiliate.description}</p>
        </div>
        <a
          href={affiliate.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors whitespace-nowrap"
        >
          {affiliate.cta}
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
