import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
    </div>
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute