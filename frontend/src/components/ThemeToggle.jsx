import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all duration-200 shadow-sm active:scale-95 ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transform rotate-0 scale-100 transition-all duration-300" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 transform rotate-0 scale-100 transition-all duration-300" />
        )}
      </div>
    </button>
  )
}
