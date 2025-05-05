import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const Input = ({
  id,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  autoComplete = 'off',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type === 'password' && showPassword ? 'text' : type}
          className={`input-field ${error ? 'border-error-400 focus:ring-error-400' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

export default Input