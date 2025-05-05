import { useState, useEffect } from 'react'
import { FiLogOut, FiMenu, FiUser, FiPlus, FiX, FiSearch, FiCloud } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, query, where, orderBy, onSnapshot, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import ContactModal from '../components/contacts/ContactModal'
import ContactList from '../components/contacts/ContactList'
import CustomSelect from '../components/common/CustomSelect'
import DeleteConfirmationModal from '../components/common/DeleteConfirmationModal'

const Dashboard = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [selectedContact, setSelectedContact] = useState(null)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, contact: null })
  
  useEffect(() => {
    const contactsRef = collection(db, 'contacts')
    const q = query(
      contactsRef,
      where('userId', '==', currentUser.uid),
      orderBy(sortBy === 'name' ? 'name' : 'createdAt', sortBy === 'name' ? 'asc' : 'desc')
    )
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contactsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setContacts(contactsList)
      setLoading(false)
    }, (error) => {
      console.error('Error fetching contacts:', error)
      toast.error('Failed to load contacts')
      setLoading(false)
    })

    return () => unsubscribe()
  }, [currentUser.uid, sortBy])

  const checkExistingContact = async (phone) => {
    const contactsRef = collection(db, 'contacts')
    const q = query(
      contactsRef,
      where('userId', '==', currentUser.uid),
      where('phone', '==', phone)
    )
    const snapshot = await getDocs(q)
    return !snapshot.empty
  }

  const handleAddContact = async (contactData) => {
    setSaving(true)
    try {
      const exists = await checkExistingContact(contactData.phone)
      if (exists) {
        toast.error('A contact with this phone number already exists')
        return
      }

      const contactsRef = collection(db, 'contacts')
      await addDoc(contactsRef, {
        ...contactData,
        userId: currentUser.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      toast.success('Contact added successfully')
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error adding contact:', error)
      toast.error('Failed to add contact')
    } finally {
      setSaving(false)
    }
  }

  const handleEditContact = async (contactData) => {
    setSaving(true)
    try {
      if (contactData.phone !== selectedContact.phone) {
        const exists = await checkExistingContact(contactData.phone)
        if (exists) {
          toast.error('A contact with this phone number already exists')
          return
        }
      }

      const contactRef = doc(db, 'contacts', selectedContact.id)
      await updateDoc(contactRef, {
        ...contactData,
        updatedAt: new Date().toISOString()
      })
      
      toast.success('Contact updated successfully')
      setIsModalOpen(false)
      setSelectedContact(null)
    } catch (error) {
      console.error('Error updating contact:', error)
      toast.error('Failed to update contact')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteContact = async () => {
    try {
      await deleteDoc(doc(db, 'contacts', deleteModal.contact.id))
      toast.success('Contact deleted successfully')
      setDeleteModal({ isOpen: false, contact: null })
    } catch (error) {
      console.error('Error deleting contact:', error)
      toast.error('Failed to delete contact')
    }
  }

  const openEditModal = (contact) => {
    setSelectedContact(contact)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedContact(null)
  }

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  )

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to log out')
    }
  }

  const sortOptions = [
    { value: 'name', label: 'Sort by name' },
    { value: 'date', label: 'Sort by date' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <FiCloud className="text-primary-400" />
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Cloud Contact Saver
              </span>
            </h1>
            
            {/* Desktop menu */}
            <nav className="hidden md:flex items-center gap-2">
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
              >
                <FiUser className="text-primary-400" />
                <span>{currentUser?.displayName || 'Profile'}</span>
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
              >
                <FiLogOut className="text-primary-400" />
                <span>Logout</span>
              </button>
            </nav>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden border-b border-gray-800"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button 
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
                >
                  <FiUser className="text-primary-400" />
                  <span>{currentUser?.displayName || 'Profile'}</span>
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
                >
                  <FiLogOut className="text-primary-400" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Welcome, {currentUser?.displayName || 'User'}!</h2>
              <p className="text-gray-400 text-sm">{currentUser?.email}</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary flex items-center p-1.5 rounded-xl gap-2 group px-6"
            >
              <FiPlus className="transform transition-all duration-200 group-hover:rotate-90" />
              Add Contact
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
          </div>
        ) : contacts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Search and filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/50 transition-all duration-200"
                />
              </div>
              
              <CustomSelect
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
              />
            </div>

            {/* Contact list */}
            <ContactList
              contacts={filteredContacts}
              onEdit={openEditModal}
              onDelete={(id) => {
                const contact = contacts.find(c => c.id === id);
                setDeleteModal({ isOpen: true, contact });
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mb-6">
              <FiUser size={32} className="text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">No contacts yet</h3>
            <p className="text-gray-400 mb-8 max-w-md">
              Your contact list is empty. Add your first contact to get started with Cloud Contact Saver.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary flex items-center gap-2 group px-6"
            >
              <FiPlus className="transform transition-all duration-200 group-hover:rotate-90" />
              Add Your First Contact
            </button>
          </motion.div>
        )}
      </main>

      <ContactModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={selectedContact ? handleEditContact : handleAddContact}
        loading={saving}
        contact={selectedContact}
      />

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, contact: null })}
        onConfirm={handleDeleteContact}
        contactName={deleteModal.contact?.name}
      />
    </div>
  )
}

export default Dashboard