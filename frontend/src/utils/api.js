import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
})

api.interceptors.request.use((config) => {
  if (window.__authToken) {
    config.headers.Authorization = `Bearer ${window.__authToken}`
  }
  return config
})

export const fetchPosts = (category, search, offset = 0) =>
  api.get('/api/posts', { params: { category, search, offset, limit: 12 } })

export const fetchPost = (slug) => api.get(`/api/posts/${slug}`)

export const fetchAdminPosts = () => api.get('/api/admin/posts')

export const createPost = (data) => api.post('/api/admin/posts', data)

export const updatePost = (id, data) => api.put(`/api/admin/posts/${id}`, data)

export const deletePost = (id) => api.delete(`/api/admin/posts/${id}`)

export const loginAdmin = (username, password) =>
  api.post('/api/auth/login', { username, password })

export const uploadImage = (formData) =>
  api.post('/api/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

export default api
