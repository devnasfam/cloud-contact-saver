import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiCloud, FiArrowLeft } from 'react-icons/fi'
import ProfileCard from '../components/profile/ProfileCard'
import toast from 'react-hot-toast'

const Profile = () => {
  const { currentUser, updateUserProfile } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleUpdateProfile = async (data) => {
    setLoading(true)
    try {
      await updateUserProfile(currentUser, data)
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50">
              <FiCloud className="text-3xl text-primary-400" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Account Settings
            </h1>
          </div>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
          >
            <FiArrowLeft className="text-primary-400" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <ProfileCard
          user={currentUser}
          onUpdateProfile={handleUpdateProfile}
          loading={loading}
        />
      </main>
    </div>
  )
}

export default Profile