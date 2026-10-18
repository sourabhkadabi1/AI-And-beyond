import { createContext, useContext, useState } from 'react'
import { setAuthToken } from '../utils/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = (token) => {
    setAuthToken(token)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setAuthToken(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
