import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchPosts } from '../utils/api'
import CategoryFilter from '../components/CategoryFilter'
import BlogCard from '../components/BlogCard'
import { Search, X } from 'lucide-react'

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') || null
  const searchParam = searchParams.get('search') || null

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState(searchParam || '')
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const POSTS_PER_PAGE = 12

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      const current = searchParams.get('search') || ''
      if (searchInput !== current) {
        const newParams = new URLSearchParams(searchParams)
        if (searchInput) {
          newParams.set('search', searchInput)
        } else {
          newParams.delete('search')
        }
        setSearchParams(newParams)
        setPage(0)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        const offset = page * POSTS_PER_PAGE
        const res = await fetchPosts(categoryParam, searchParam, offset)
        const data = res.data || []
        setPosts(data)
        setHasMore(data.length === POSTS_PER_PAGE)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [categoryParam, searchParam, page])

  const handleCategoryChange = (cat) => {
    const newParams = new URLSearchParams(searchParams)
    if (cat) {
      newParams.set('category', cat)
    } else {
      newParams.delete('category')
    }
    newParams.delete('search')
    setSearchParams(newParams)
    setSearchInput('')
    setPage(0)
  }

  const clearFilters = () => {
    setSearchInput('')
    setSearchParams(new URLSearchParams())
    setPage(0)
  }

  const handlePrev = () => {
    if (page > 0) {
      setPage(p => p - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (hasMore) {
      setPage(p => p + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full text-slate-900 dark:text-slate-100">
      <div className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          Our Blog
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Discover the latest trends, tutorials, and insights in AI, Web Hosting, and beyond.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
          <CategoryFilter active={categoryParam} onChange={handleCategoryChange} />
        </div>

        <div className="relative w-full lg:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 py-2.5 transition-all shadow-sm"
            placeholder="Search articles..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {(categoryParam || searchParam) && (
        <div className="mb-8 flex items-center gap-2 text-slate-600 dark:text-slate-300 flex-wrap text-sm">
          <span>Showing results for:</span>
          {categoryParam && (
            <span className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-full font-bold text-slate-900 dark:text-white shadow-sm">
              {categoryParam}
            </span>
          )}
          {searchParam && (
            <span className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-full font-bold text-slate-900 dark:text-white shadow-sm">
              "{searchParam}"
            </span>
          )}
          <button onClick={clearFilters} className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline ml-2 cursor-pointer">
            Clear all
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col gap-4 animate-pulse bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl aspect-video w-full"></div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/4 mt-2"></div>
              <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-3/4"></div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center p-8 shadow-sm">
          <Search size={48} className="text-indigo-600 dark:text-indigo-400 mb-4 opacity-40" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No posts found</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">We couldn't find anything matching your current filters.</p>
          <button
            onClick={clearFilters}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-colors shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {(page > 0 || hasMore) && (
            <div className="flex justify-center items-center mt-16 gap-4">
              <button
                onClick={handlePrev}
                disabled={page === 0}
                className="px-6 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo-500 transition-colors shadow-sm cursor-pointer"
              >
                Previous
              </button>
              <span className="text-slate-600 dark:text-slate-400 font-semibold text-sm">
                Page {page + 1}
              </span>
              <button
                onClick={handleNext}
                disabled={!hasMore}
                className="px-6 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo-500 transition-colors shadow-sm cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
