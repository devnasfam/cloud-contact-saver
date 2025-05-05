import { createContext, useContext, useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Sign up function
  async function signup(email, password, displayName) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // Update profile with display name
    await updateProfile(userCredential.user, {
      displayName: displayName
    })
    return userCredential
  }

  // Login function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Logout function
  function logout() {
    return signOut(auth)
  }

  // Reset password function
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  // Update profile function
  function updateUserProfile(user, data) {
    return updateProfile(user, data)
  }

  // Reset error
  function resetError() {
    setError('')
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    error,
    setError,
    resetError
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}