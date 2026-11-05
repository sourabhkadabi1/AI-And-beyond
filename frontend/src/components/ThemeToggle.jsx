import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center justify-center p-2 rounded-lg border border-[#E5E5E5] dark:border-[#262626] bg-[#F5F5F5] hover:bg-[#E5E5E5] dark:bg-[#1C1C1C] dark:hover:bg-[#262626] text-[#555555] dark:text-[#A0A0A0] transition-colors duration-200 ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#F5A623]" />
      ) : (
        <Moon className="w-4 h-4 text-[#555555]" />
      )}
    </button>
  )
}
