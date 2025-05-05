import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiUser, FiPhone, FiFileText } from 'react-icons/fi'
import Button from '../common/Button'
import Input from '../common/Input'

const ContactModal = ({ isOpen, onClose, onSave, loading, contact = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    notes: ''
  })

  useEffect(() => {
    if (contact) {
      setFormData(contact)
    } else {
      setFormData({
        name: '',
        phone: '',
        notes: ''
      })
    }
  }, [contact])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    if (!contact) {
      setFormData({ name: '', phone: '', notes: '' })
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gray-800/90 backdrop-blur-md rounded-xl shadow-xl w-full max-w-md border border-gray-700"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                {contact ? 'Edit Contact' : 'Add New Contact'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 rounded-lg p-1"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input
                id="name"
                label="Name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter contact name"
                icon={<FiUser className="text-primary-400" />}
              />

              <Input
                id="phone"
                label="Phone Number"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
                icon={<FiPhone className="text-primary-400" />}
              />

              <div className="space-y-1">
                <label className="form-label flex items-center gap-2" htmlFor="notes">
                  <FiFileText className="text-primary-400" />
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any additional notes"
                  className="input-field min-h-[100px] resize-y"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  className="px-6"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  className="px-6"
                >
                  {contact ? 'Update Contact' : 'Save Contact'}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactModal