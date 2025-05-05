import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';
import Button from './Button';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, contactName }) => {
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
            className="bg-gray-800/90 backdrop-blur-md rounded-xl shadow-xl w-full max-w-md border border-gray-700 overflow-hidden"
          >
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-error-400/10 rounded-full flex items-center justify-center mb-4">
                <FiAlertTriangle size={32} className="text-error-400" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Delete Contact</h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete <span className="text-white font-medium">{contactName}</span>? This action cannot be undone.
              </p>
              
              <div className="flex gap-3 w-full">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={onConfirm}
                  fullWidth
                  className="!bg-error-400 hover:!bg-error-500"
                >
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;