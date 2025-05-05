import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  fullWidth = false, 
  loading = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  const baseClasses = 'btn'
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  }
  
  const widthClasses = fullWidth ? 'w-full' : ''
  
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClasses} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  )
}

export default Button