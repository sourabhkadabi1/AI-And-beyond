/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        dark: {
          bg: 'var(--bg-page)',
          surface: 'var(--bg-surface)',
          'surface-2': 'var(--bg-surface-2)',
          border: 'var(--border-color)',
        },
        light: {
          bg: '#FAFAFA',
          surface: '#FFFFFF',
          elevated: '#F5F5F5',
          border: '#E5E5E5',
        },
        'text-1': 'var(--text-primary)',
        'text-2': 'var(--text-secondary)',
        'text-3': 'var(--text-muted)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '10px',
      },
    },
  },
  plugins: [],
}
