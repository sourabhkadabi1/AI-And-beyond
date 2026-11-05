import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Blog from './pages/Blog'
import PostDetail from './pages/PostDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import AffiliateDisclosure from './pages/AffiliateDisclosure'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import NewPost from './pages/admin/NewPost'
import EditPost from './pages/admin/EditPost'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0A0A0A] text-text-1 transition-colors duration-200">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<PostDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
                  <Route path="/admin" element={<Login />} />
                  <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/admin/new-post" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
                  <Route path="/admin/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
                  <Route path="*" element={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center bg-white dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] rounded-[10px] p-12 max-w-md mx-4">
                        <h1 className="text-6xl font-extrabold font-display text-[#F5A623] mb-4">404</h1>
                        <p className="text-xl font-bold text-[#111111] dark:text-white mb-2">Page Not Found</p>
                        <p className="text-[#555555] dark:text-[#A0A0A0] mb-8">The page you're looking for doesn't exist or has been moved.</p>
                        <a href="/" className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#E09915] text-[#111111] px-6 py-3 rounded-lg font-bold text-sm transition-colors shadow-sm">
                          ← Back to Home
                        </a>
                      </div>
                    </div>
                  } />
                </Routes>
              </main>
              <Footer />
              <Toaster 
                position="bottom-right" 
                toastOptions={{
                  style: { 
                    background: 'var(--bg-surface)', 
                    color: 'var(--text-primary)', 
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                  }
                }} 
              />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
