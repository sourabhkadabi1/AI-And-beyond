/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        dark: {
          bg: 'var(--bg-page)',
          surface: 'var(--bg-surface)',
          'surface-2': 'var(--bg-surface-2)',
          border: 'var(--border-color)',
        },
        light: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          border: '#E2E8F0',
        },
        'text-1': 'var(--text-primary)',
        'text-2': 'var(--text-secondary)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
