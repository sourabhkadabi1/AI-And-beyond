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

  useEffect(() => {
    setPage(0)
    setPosts([])
    setHasMore(true)
  }, [categoryParam, searchParam])

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetchPosts(categoryParam, searchParam, page)
        const newPosts = res.data || []
        setPosts(prev => page === 0 ? newPosts : [...prev, ...newPosts])
        if (newPosts.length < POSTS_PER_PAGE) {
          setHasMore(false)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [categoryParam, searchParam, page])

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams)
    if (cat) {
      params.set('category', cat)
    } else {
      params.delete('category')
    }
    setSearchParams(params)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchInput.trim()) {
      params.set('search', searchInput.trim())
    } else {
      params.delete('search')
    }
    setSearchParams(params)
  }

  const clearFilters = () => {
    setSearchInput('')
    setSearchParams({})
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
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#111111] dark:text-[#FFFFFF] flex flex-col">
      {/* ── Editorial Header & Filter Section ── */}
      <div className="border-b border-[#E5E5E5] dark:border-[#262626] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-xl p-8 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-extrabold bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/30 mb-3">
                  KNOWLEDGE BASE
                </div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] dark:text-[#FFFFFF] tracking-tight">
                  Our Blog
                </h1>
                <p className="text-base text-[#555555] dark:text-[#A0A0A0] max-w-xl mt-1 leading-relaxed">
                  Discover the latest trends, tutorials, and insights in AI, Web Hosting, and beyond.
                </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative w-full md:w-80">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search size={18} className="text-[#F5A623]" />
                </div>
                <input
                  type="text"
                  className="bg-[#F5F5F5] dark:bg-[#1C1C1C] border border-[#E5E5E5] dark:border-[#262626] text-[#111111] dark:text-[#FFFFFF] placeholder-[#999999] text-sm rounded-lg focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] block w-full pl-10 pr-10 py-2.5 transition-colors"
                  placeholder="Search articles..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput('')}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#999999] hover:text-[#111111] dark:hover:text-[#FFFFFF]"
                  >
                    <X size={18} />
                  </button>
                )}
              </form>
            </div>

            {/* Filter Pills */}
            <div className="pt-6 border-t border-[#E5E5E5] dark:border-[#262626]">
              <CategoryFilter active={categoryParam} onChange={handleCategoryChange} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Posts Grid ── */}
      <div className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-6">
          {(categoryParam || searchParam) && (
            <div className="mb-8 flex items-center gap-2 text-[#555555] dark:text-[#A0A0A0] flex-wrap text-sm">
              <span>Showing results for:</span>
              {categoryParam && (
                <span className="px-3 py-1 bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-lg font-bold text-[#111111] dark:text-[#FFFFFF]">
                  {categoryParam}
                </span>
              )}
              {searchParam && (
                <span className="px-3 py-1 bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-lg font-bold text-[#111111] dark:text-[#FFFFFF]">
                  "{searchParam}"
                </span>
              )}
              <button onClick={clearFilters} className="text-sm font-bold text-[#F5A623] hover:underline ml-2 cursor-pointer">
                Clear all
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col gap-4 animate-pulse bg-[#FFFFFF] dark:bg-[#141414] p-4 rounded-xl border border-[#E5E5E5] dark:border-[#262626]">
                  <div className="bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded-lg aspect-video w-full"></div>
                  <div className="h-4 bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded w-1/4 mt-2"></div>
                  <div className="h-6 bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded w-3/4"></div>
                  <div className="h-4 bg-[#F5F5F5] dark:bg-[#1C1C1C] rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-[#FFFFFF] dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-xl flex flex-col items-center p-8">
              <Search size={48} className="text-[#F5A623] mb-4 opacity-40" />
              <h3 className="text-xl font-bold text-[#111111] dark:text-[#FFFFFF] mb-2">No posts found</h3>
              <p className="text-[#555555] dark:text-[#A0A0A0] mb-6 text-sm">We couldn't find anything matching your current filters.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 bg-[#F5A623] hover:bg-[#E09515] text-[#0A0A0A] rounded-lg font-bold text-sm transition-colors cursor-pointer"
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
                    className="px-6 py-2.5 border border-[#E5E5E5] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#141414] text-[#111111] dark:text-[#FFFFFF] font-semibold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#F5A623] transition-colors cursor-pointer"
                  >
                    Previous
                  </button>
                  <span className="text-[#555555] dark:text-[#A0A0A0] font-semibold text-sm">
                    Page {page + 1}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={!hasMore}
                    className="px-6 py-2.5 border border-[#E5E5E5] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#141414] text-[#111111] dark:text-[#FFFFFF] font-semibold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#F5A623] transition-colors cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
