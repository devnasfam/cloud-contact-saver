import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import ProtectedRoute from './components/common/ProtectedRoute'
import NotFound from './pages/NotFound'
import { useAuth } from './context/AuthContext'

function App() {
  const { currentUser, loading } = useAuth()
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
    </div>
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/dashboard" />} />
      <Route path="/forgot-password" element={!currentUser ? <ForgotPassword /> : <Navigate to="/dashboard" />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App