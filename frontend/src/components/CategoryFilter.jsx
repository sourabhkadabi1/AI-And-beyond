const categories = ['All', 'AI Tools', 'AI Agents & Automation', 'Web Hosting', 'Tutorials', 'Productivity', 'MakeMoneyWithAI']

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map(cat => {
        const isActive = (active === null && cat === 'All') || active === cat
        return (
          <button
            key={cat}
            onClick={() => onChange(cat === 'All' ? null : cat)}
            className={`px-4 py-2 rounded-lg border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              isActive
                ? 'bg-[#F5A623] text-black border-[#F5A623] font-bold'
                : 'border-[#E5E5E5] dark:border-[#262626] text-[#555555] dark:text-[#A0A0A0] bg-white dark:bg-[#141414] hover:border-[#F5A623]/50 hover:text-[#111111] dark:hover:text-white'
            }`}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
