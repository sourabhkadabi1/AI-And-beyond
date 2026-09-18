import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isLoggedIn, logout } = useAuth()
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo with Guaranteed Vibrant Gradient */}
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-xl group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="tracking-tight">
            <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">AI</span>
            <span className="text-slate-900 dark:text-white">AndBeyond</span>
          </span>
        </Link>

        {/* Desktop Links with High Contrast */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-semibold transition-colors ${
                location.pathname === l.to 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}

          {isLoggedIn && (
            <>
              <Link 
                to="/admin/dashboard" 
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                Dashboard
              </Link>
              <button 
                onClick={logout} 
                className="text-sm font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 transition-colors"
              >
                Logout
              </button>
            </>
          )}

          {/* Theme Toggle Button */}
          <div className="pl-3 border-l border-slate-200 dark:border-slate-800">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 flex flex-col gap-2.5 shadow-xl animate-fadeIn">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`text-sm font-semibold py-2 px-3 rounded-xl transition-colors ${
                location.pathname === l.to 
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {l.label}
            </Link>
          ))}
          {isLoggedIn && (
            <>
              <Link 
                to="/admin/dashboard" 
                onClick={() => setOpen(false)} 
                className="text-sm font-semibold text-slate-700 dark:text-slate-300 py-2 px-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Dashboard
              </Link>
              <button 
                onClick={() => { logout(); setOpen(false) }} 
                className="text-sm font-semibold text-left text-rose-600 dark:text-rose-400 py-2 px-3"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
