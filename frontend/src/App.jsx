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
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import NewPost from './pages/admin/NewPost'
import EditPost from './pages/admin/EditPost'

import ParticleCanvas from './components/ParticleCanvas'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#070b12] text-text-1 transition-colors duration-300 relative overflow-x-hidden">
              {/* Global Living Particle Cosmos & Ambient Nebula across ALL pages */}
              <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
                <ParticleCanvas className="w-full h-full" />
                <div className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full bg-indigo-600/15 dark:bg-indigo-600/20 blur-[130px] pointer-events-none" />
                <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-purple-600/10 dark:bg-purple-600/15 blur-[130px] pointer-events-none" />
                <div className="absolute -bottom-32 right-1/4 w-[650px] h-[650px] rounded-full bg-cyan-600/10 dark:bg-cyan-600/15 blur-[150px] pointer-events-none" />
              </div>

              <div className="relative z-10 flex flex-col flex-grow">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<PostDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/admin" element={<Login />} />
                    <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/admin/new-post" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
                    <Route path="/admin/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
                  </Routes>
                </main>
                <Footer />
              </div>
              <Toaster 
                position="bottom-right" 
                toastOptions={{
                  style: { 
                    background: 'var(--bg-surface)', 
                    color: 'var(--text-primary)', 
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
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
