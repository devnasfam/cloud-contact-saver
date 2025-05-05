import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCloud, FiArrowLeft, FiMail } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { resetPassword, resetError } = useAuth()

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    if (!email.trim()) {
      toast.error('Email is required')
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address')
      newErrors.email = 'Email is invalid'
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
      await resetPassword(email)
      toast.success('Password reset link sent! Check your email')
      setEmail('')
    } catch (error) {
      console.error('Password reset error:', error)

      let errorMessage = 'Failed to reset password'
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email'
        toast.error('No account found with this email')
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address'
        toast.error('Please enter a valid email address')
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts. Please try again later'
        toast.error('Too many attempts. Please try again later')
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection'
        toast.error('Network error. Please check your connection')
      } else {
        toast.error('An unexpected error occurred')
      }

      setErrors({ email: errorMessage })
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

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md transform transition-all duration-300 ease-in-out bg-gray-900 backdrop-blur-sm border border-gray-800 p-8 rounded-lg shadow-xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Reset Password
          </h1>
          <p className="text-gray-400">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors?.email}
          required
          icon={<FiMail />}
          autoComplete="email"
        />

        <div className="mb-6">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
          >
            Send Reset Link
          </Button>
        </div>

        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-gray-400 hover:text-primary-400 transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" />
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword