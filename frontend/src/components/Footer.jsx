import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 dark:border-white/5 bg-slate-100/40 dark:bg-black/25 backdrop-blur-md mt-20 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-xl mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-accent to-accent-2 flex items-center justify-center text-white shadow-sm">
                <Zap size={16} fill="currentColor" />
              </div>
              <span className="tracking-tight">
                <span className="text-accent font-extrabold">AI</span>
                <span className="text-text-1">AndBeyond</span>
              </span>
            </div>
            <p className="text-text-2 text-sm max-w-xs leading-relaxed">
              AI tools, AI agents, automation workflows, and tutorials for students and professionals who want to stay ahead.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="text-text-1 font-semibold text-sm mb-3">Explore</p>
              <div className="flex flex-col gap-2">
                {['/', '/blog', '/about'].map((path, i) => (
                  <Link key={path} to={path} className="text-text-2 text-sm hover:text-accent transition-colors">
                    {['Home', 'Blog', 'About'][i]}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-text-1 font-semibold text-sm mb-3">Topics</p>
              <div className="flex flex-col gap-2">
                {['AI Tools', 'AI Agents & Automation', 'Web Hosting', 'Tutorials', 'Productivity', 'MakeMoneyWithAI'].map(cat => (
                  <Link key={cat} to={`/blog?category=${encodeURIComponent(cat)}`} className="text-text-2 text-sm hover:text-accent transition-colors">
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-border/60 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-text-2">
          <p>&copy; {new Date().getFullYear()} AIAndBeyond. All rights reserved.</p>
          <p className="text-center md:text-right">
            This site contains affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  )
}
