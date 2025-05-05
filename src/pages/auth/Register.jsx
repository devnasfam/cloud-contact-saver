import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import AuthForm from '../../components/auth/AuthForm'
import { FiCloud } from 'react-icons/fi'
import { db } from '../../firebase'
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore'

const Register = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  
  const { signup, setError, resetError } = useAuth()
  const navigate = useNavigate()

  const checkExistingUser = async (email, displayName) => {
    const usersRef = collection(db, 'users')
    
    // Check email
    const emailQuery = query(usersRef, where('email', '==', email.toLowerCase()))
    const emailSnapshot = await getDocs(emailQuery)
    if (!emailSnapshot.empty) {
      throw new Error('email-exists')
    }
    
    // Check username
    const usernameQuery = query(usersRef, where('displayName', '==', displayName.trim()))
    const usernameSnapshot = await getDocs(usernameQuery)
    if (!usernameSnapshot.empty) {
      throw new Error('username-exists')
    }
  }

  const validateForm = () => {
    const newErrors = {}
    let isValid = true
    
    if (!displayName.trim()) {
      toast.error('Name is required')
      newErrors.displayName = 'Name is required'
      isValid = false
    }
    
    if (!email.trim()) {
      toast.error('Email is required')
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address')
      newErrors.email = 'Email is invalid'
      isValid = false
    }
    
    if (!password) {
      toast.error('Password is required')
      newErrors.password = 'Password is required'
      isValid = false
    } else if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    }
    
    setErrors(newErrors)
    return isValid
  }

  const createUserDocument = async (user) => {
    const userRef = doc(db, 'users', user.uid)
    const userData = {
      userId: user.uid,
      displayName: user.displayName,
      email: user.email.toLowerCase(),
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      contacts: [],
      settings: {
        theme: 'dark',
        notifications: true
      }
    }

    try {
      await setDoc(userRef, userData)
    } catch (error) {
      console.error('Error creating user document:', error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    resetError()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      // Check if email or username already exists
      await checkExistingUser(email, displayName)
      
      const userCredential = await signup(email, password, displayName)
      await createUserDocument(userCredential.user)
      toast.success('Welcome to Cloud Contact Saver!')
      navigate('/dashboard')
    } catch (error) {
      console.error('Registration error:', error)
      
      let errorMessage = 'Failed to create an account'
      
      if (error.message === 'email-exists') {
        errorMessage = 'This email is already registered'
        toast.error('This email is already registered')
        setErrors(prev => ({ ...prev, email: 'Email already in use' }))
      } else if (error.message === 'username-exists') {
        errorMessage = 'This username is already taken'
        toast.error('This username is already taken')
        setErrors(prev => ({ ...prev, displayName: 'Username already taken' }))
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered'
        toast.error('This email is already registered')
        setErrors(prev => ({ ...prev, email: 'Email already in use' }))
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address'
        toast.error('Please enter a valid email address')
        setErrors(prev => ({ ...prev, email: 'Invalid email format' }))
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak'
        toast.error('Please choose a stronger password')
        setErrors(prev => ({ ...prev, password: 'Password is too weak' }))
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection'
        toast.error('Network error. Please check your connection')
      } else {
        toast.error('An unexpected error occurred')
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto px-20 py-6 space-y-6 pb-20 pt-20 md:pb-6">
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="flex items-center mb-8 transform transition-all duration-300 hover:scale-105">
        <FiCloud className="text-primary-400 mr-2 text-4xl" />
        <h1 className="text-2xl font-bold text-white">Cloud Contact Saver</h1>
      </div>
      
      <AuthForm
        type="register"
        onSubmit={handleSubmit}
        loading={loading}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        displayName={displayName}
        setDisplayName={setDisplayName}
        errors={errors}
      />
    </div>
    </main>
  )
}

export default Register