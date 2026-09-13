const categories = ['All', 'AI Tools', 'Web Hosting', 'Tech Reviews', 'Tutorials', 'Productivity', 'MakeMoneyWithAI']

const activeColors = {
  'AI Tools':        'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-bold shadow-sm',
  'Web Hosting':     'border-cyan-600 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 font-bold shadow-sm',
  'Tech Reviews':    'border-amber-600 dark:border-amber-400 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 font-bold shadow-sm',
  'Tutorials':       'border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 font-bold shadow-sm',
  'Productivity':    'border-pink-600 dark:border-pink-400 text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/60 font-bold shadow-sm',
  'MakeMoneyWithAI': 'border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/60 font-bold shadow-sm',
  'All':             'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-bold shadow-sm',
}

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map(cat => {
        const isActive = (active === null && cat === 'All') || active === cat
        return (
          <button
            key={cat}
            onClick={() => onChange(cat === 'All' ? null : cat)}
            className={`px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              isActive
                ? activeColors[cat]
                : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
