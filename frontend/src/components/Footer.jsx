import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5] dark:border-[#262626] bg-[#F5F5F5] dark:bg-[#0A0A0A] mt-20 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-1 font-display font-bold text-xl mb-3 tracking-tight">
              <span className="text-[#F5A623] font-extrabold">AI</span>
              <span className="text-[#111111] dark:text-white">AndBeyond</span>
            </div>
            <p className="text-[#555555] dark:text-[#A0A0A0] text-sm max-w-xs leading-relaxed">
              AI tools, AI agents, automation workflows, and tutorials for students and professionals who want to stay ahead.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-14">
            <div>
              <p className="text-[#111111] dark:text-white font-semibold text-sm mb-3">Explore</p>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-[#555555] dark:text-[#A0A0A0] text-sm hover:text-[#F5A623] transition-colors">Home</Link>
                <Link to="/blog" className="text-[#555555] dark:text-[#A0A0A0] text-sm hover:text-[#F5A623] transition-colors">Blog</Link>
                <Link to="/about" className="text-[#555555] dark:text-[#A0A0A0] text-sm hover:text-[#F5A623] transition-colors">About Us</Link>
                <Link to="/contact" className="text-[#555555] dark:text-[#A0A0A0] text-sm hover:text-[#F5A623] transition-colors">Contact</Link>
              </div>
            </div>

            <div>
              <p className="text-[#111111] dark:text-white font-semibold text-sm mb-3">Legal & Trust</p>
              <div className="flex flex-col gap-2">
                <Link to="/privacy-policy" className="text-[#555555] dark:text-[#A0A0A0] text-sm hover:text-[#F5A623] transition-colors">Privacy Policy</Link>
                <Link to="/affiliate-disclosure" className="text-[#555555] dark:text-[#A0A0A0] text-sm hover:text-[#F5A623] transition-colors">Affiliate Disclosure</Link>
                <Link to="/contact" className="text-[#555555] dark:text-[#A0A0A0] text-sm hover:text-[#F5A623] transition-colors">Editorial Support</Link>
              </div>
            </div>

            <div>
              <p className="text-[#111111] dark:text-white font-semibold text-sm mb-3">Topics</p>
              <div className="flex flex-col gap-2">
                {['AI Tools', 'AI Agents & Automation', 'Web Hosting', 'Tutorials', 'Productivity', 'MakeMoneyWithAI'].map(cat => (
                  <Link key={cat} to={`/blog?category=${encodeURIComponent(cat)}`} className="text-[#555555] dark:text-[#A0A0A0] text-sm hover:text-[#F5A623] transition-colors">
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E5E5] dark:border-[#262626] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#999999] dark:text-[#666666]">
          <p>&copy; {new Date().getFullYear()} AIAndBeyond. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-center md:text-right">
            <span>
              This site contains affiliate links. We may earn a commission at no extra cost to you.
            </span>
            <Link to="/affiliate-disclosure" className="text-[#F5A623] hover:underline font-medium">
              Read Disclosure
            </Link>
            <span>·</span>
            <Link to="/privacy-policy" className="text-[#F5A623] hover:underline font-medium">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
