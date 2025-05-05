import { useState } from 'react'
import { FiEdit2, FiMail, FiUser, FiSave } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import Input from '../common/Input'

const ProfileCard = ({ user, onUpdateProfile, loading }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!displayName.trim()) {
      setErrors({ displayName: 'Name is required' })
      return
    }

    try {
      await onUpdateProfile({ displayName: displayName.trim() })
      setIsEditing(false)
      setErrors({})
    } catch (error) {
      setErrors({ displayName: 'Failed to update profile' })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6"
    >
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-semibold">Profile Details</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-lg text-gray-400 hover:text-primary-400 hover:bg-primary-400/10 transition-colors"
          >
            <FiEdit2 size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {isEditing ? (
            <Input
              id="displayName"
              label="Display Name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              error={errors.displayName}
              icon={<FiUser className="text-primary-400" />}
            />
          ) : (
            <div className="space-y-1">
              <label className="text-sm text-gray-400">Display Name</label>
              <div className="flex items-center gap-2 p-2 bg-gray-900/50 rounded-lg">
                <FiUser className="text-primary-400" />
                <span className="text-gray-200">{user?.displayName}</span>
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm text-gray-400">Email Address</label>
            <div className="flex items-center gap-2 p-2 bg-gray-900/50 rounded-lg">
              <FiMail className="text-primary-400" />
              <span className="text-gray-200">{user?.email}</span>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsEditing(false)
                setDisplayName(user?.displayName || '')
                setErrors({})
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="flex items-center gap-2"
            >
              <FiSave />
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </motion.div>
  )
}

export default ProfileCard