import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
})

// Module-level token storage (not accessible via window/global scope)
let _authToken = null

export const setAuthToken = (token) => {
  _authToken = token
}

api.interceptors.request.use((config) => {
  if (_authToken) {
    config.headers.Authorization = `Bearer ${_authToken}`
  }
  return config
})

// Auto-logout on 401 responses (expired/invalid token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && _authToken) {
      // Token expired or invalid — clear it
      _authToken = null
      // Redirect to login if on admin page
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin') {
        window.location.href = '/admin'
      }
    }
    return Promise.reject(error)
  }
)

export const fetchPosts = (category, search, offset = 0) =>
  api.get('/api/posts', { params: { category, search, offset, limit: 12 } })

export const fetchPost = (slug) => api.get(`/api/posts/${slug}`)

export const fetchAdminPosts = () => api.get('/api/admin/posts')

export const fetchAdminPost = (id) => api.get(`/api/admin/posts/${id}`)

export const createPost = (data) => api.post('/api/admin/posts', data)

export const updatePost = (id, data) => api.put(`/api/admin/posts/${id}`, data)

export const deletePost = (id) => api.delete(`/api/admin/posts/${id}`)

export const loginAdmin = (username, password) =>
  api.post('/api/auth/login', { username, password })

export const uploadImage = (formData) =>
  api.post('/api/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export const subscribeNewsletter = (email) =>
  api.post('/api/subscribers', { email })

export const fetchSubscribers = () =>
  api.get('/api/admin/subscribers')

export const deleteSubscriber = (id) =>
  api.delete(`/api/admin/subscribers/${id}`)

export default api
