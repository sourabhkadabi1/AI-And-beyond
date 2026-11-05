import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
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
    <nav className="sticky top-0 z-50 border-b border-[#E5E5E5] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-1 font-display font-bold text-xl tracking-tight">
          <span className="text-[#F5A623] font-extrabold">AI</span>
          <span className="text-[#111111] dark:text-white">AndBeyond</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-semibold transition-colors relative pb-1 ${
                location.pathname === l.to
                  ? 'text-[#F5A623] border-b-2 border-[#F5A623]'
                  : 'text-[#555555] dark:text-[#A0A0A0] hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}

          {isLoggedIn && (
            <>
              <Link
                to="/admin/dashboard"
                className="text-sm font-semibold text-[#555555] dark:text-[#A0A0A0] hover:text-[#111111] dark:hover:text-white transition-colors"
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
          <div className="pl-3 border-l border-[#E5E5E5] dark:border-[#262626]">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="p-2 rounded-lg border border-[#E5E5E5] dark:border-[#262626] bg-[#F5F5F5] dark:bg-[#1C1C1C] text-[#555555] dark:text-[#A0A0A0] hover:text-[#111111] dark:hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-[#E5E5E5] dark:border-[#262626] bg-[#FAFAFA] dark:bg-[#0A0A0A] px-4 py-4 flex flex-col gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`text-sm font-semibold py-2.5 px-3 rounded-lg transition-colors ${
                location.pathname === l.to
                  ? 'text-[#F5A623] bg-[#F5A623]/10'
                  : 'text-[#555555] dark:text-[#A0A0A0] hover:text-[#111111] dark:hover:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C]'
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
                className="text-sm font-semibold text-[#555555] dark:text-[#A0A0A0] py-2.5 px-3 hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] rounded-lg transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => { logout(); setOpen(false) }}
                className="text-sm font-semibold text-left text-rose-600 dark:text-rose-400 py-2.5 px-3"
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
