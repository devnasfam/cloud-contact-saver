import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiEdit2, FiTrash2, FiFileText } from 'react-icons/fi'

const getInitials = (name) => {
  const names = name.split(' ')
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
  }
  return names[0][0].toUpperCase()
}

const getRandomColor = (name) => {
  const colors = [
    'bg-primary-400',
    'bg-accent-400',
    'bg-success-400',
    'bg-warning-400',
    'bg-[#4CAF50]',
    'bg-[#9C27B0]',
    'bg-[#FF5722]',
    'bg-[#607D8B]'
  ]
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[index % colors.length]
}

const ContactList = ({ contacts, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence>
        {contacts.map((contact) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="group bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 hover:border-primary-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-400/10"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full ${getRandomColor(contact.name)} flex items-center justify-center text-white font-semibold text-lg shrink-0`}>
                {getInitials(contact.name)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-white truncate group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-accent-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {contact.name}
                  </h3>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 shrink-0">
                    <button 
                      onClick={() => onEdit(contact)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-primary-400 hover:bg-primary-400/10 transition-colors"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(contact.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-error-400 hover:bg-error-400/10 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mt-2">
                  <a 
                    href={`tel:${contact.phone}`}
                    className="flex items-center text-gray-300 hover:text-primary-400 transition-colors group/item"
                  >
                    <FiPhone className="mr-2 text-primary-400 group-hover/item:animate-pulse" />
                    <span className="truncate">{contact.phone}</span>
                  </a>
                  
                  {contact.notes && (
                    <div className="flex items-start gap-2 text-gray-400 text-sm mt-3 pt-3 border-t border-gray-700/50">
                      <FiFileText className="mt-0.5 text-primary-400 shrink-0" />
                      <p className="line-clamp-2">{contact.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ContactList