import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="transform transition-all duration-300 hover:scale-105">
        <h1 className="text-9xl font-bold text-primary-400">404</h1>
        
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <Link to="/" className="btn-primary inline-flex items-center hover:scale-105 transform transition-all duration-200">
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound