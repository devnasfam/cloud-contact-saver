import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import AuthForm from '../../components/auth/AuthForm'
import { FiCloud } from 'react-icons/fi'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  
  const { login, setError, resetError } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    let isValid = true
    
    if (!email.trim()) {
      toast.error('Email is required')
      newErrors.email = 'Email is required'
      isValid = false
    }
    
    if (!password) {
      toast.error('Password is required')
      newErrors.password = 'Password is required'
      isValid = false
    }
    
    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    resetError()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      await login(email, password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      
      let errorMessage = 'Failed to log in'
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password'
        toast.error('Invalid email or password')
        setErrors({ email: ' ', password: ' ' })
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts. Please try again later'
        toast.error('Too many attempts. Please try again later')
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="flex items-center mb-8 transform transition-all duration-300 hover:scale-105">
        <FiCloud className="text-primary-400 mr-2 text-4xl" />
        <h1 className="text-2xl font-bold text-white">Cloud Contact Saver</h1>
      </div>
      
      <AuthForm
        type="login"
        onSubmit={handleSubmit}
        loading={loading}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        errors={errors}
      />
    </div>
  )
}

export default Login