import { createContext, useState, useEffect } from 'react'
import { users } from '../data/users'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('hotelUser')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse stored user', e)
        localStorage.removeItem('hotelUser')
      }
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    setError(null)
    
    // Find user by email and password
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    )
    
    if (foundUser) {
      // Remove password from stored user data
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('hotelUser', JSON.stringify(userWithoutPassword))
      return true
    } else {
      setError('Invalid email or password')
      return false
    }
  }

  const register = (name, email, password, role = 'staff') => {
    setError(null)
    
    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      setError('User with this email already exists')
      return false
    }

    // In a real app, this would be an API call to register the user
    // For this demo, we'll just add to the in-memory array
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    }
    
    // Remove password from stored user data
    setUser(newUser)
    localStorage.setItem('hotelUser', JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('hotelUser')
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}