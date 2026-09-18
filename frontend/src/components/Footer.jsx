import { Link } from 'react-router-dom'
import { Rocket } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 dark:border-white/5 bg-slate-100/40 dark:bg-black/25 backdrop-blur-md mt-20 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5 font-display font-bold text-xl mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
                <Rocket size={16} />
              </div>
              <span className="tracking-tight">
                <span className="bg-gradient-to-r from-purple-500 to-rose-500 dark:from-purple-400 dark:to-rose-400 bg-clip-text text-transparent font-extrabold">AI</span>
                <span className="text-slate-950 dark:text-white">AndBeyond</span>
              </span>
            </div>
            <p className="text-text-2 text-sm max-w-xs leading-relaxed">
              AI tools, AI agents, automation workflows, and tutorials for students and professionals who want to stay ahead.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-14">
            <div>
              <p className="text-text-1 font-semibold text-sm mb-3">Explore</p>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-text-2 text-sm hover:text-accent transition-colors">Home</Link>
                <Link to="/blog" className="text-text-2 text-sm hover:text-accent transition-colors">Blog</Link>
                <Link to="/about" className="text-text-2 text-sm hover:text-accent transition-colors">About Us</Link>
                <Link to="/contact" className="text-text-2 text-sm hover:text-accent transition-colors">Contact</Link>
              </div>
            </div>

            <div>
              <p className="text-text-1 font-semibold text-sm mb-3">Legal & Trust</p>
              <div className="flex flex-col gap-2">
                <Link to="/privacy-policy" className="text-text-2 text-sm hover:text-accent transition-colors">Privacy Policy</Link>
                <Link to="/affiliate-disclosure" className="text-text-2 text-sm hover:text-accent transition-colors">Affiliate Disclosure</Link>
                <Link to="/contact" className="text-text-2 text-sm hover:text-accent transition-colors">Editorial Support</Link>
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

        <div className="border-t border-slate-200/80 dark:border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-text-2">
          <p>&copy; {new Date().getFullYear()} AIAndBeyond. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-center md:text-right">
            <span>
              This site contains affiliate links. We may earn a commission at no extra cost to you.
            </span>
            <Link to="/affiliate-disclosure" className="text-accent hover:underline font-medium">
              Read Disclosure
            </Link>
            <span>·</span>
            <Link to="/privacy-policy" className="text-accent hover:underline font-medium">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
