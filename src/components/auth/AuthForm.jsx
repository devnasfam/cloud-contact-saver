import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import Button from '../common/Button'
import Input from '../common/Input'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1 
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

const AuthForm = ({
  type,
  onSubmit,
  loading,
  email,
  setEmail,
  password,
  setPassword,
  displayName,
  setDisplayName,
  errors
}) => {
  const isLogin = type === 'login'
  const title = isLogin ? 'Welcome Back' : 'Create Account'
  const subtitle = isLogin 
    ? 'Sign in to access your contacts' 
    : 'Register to start saving your contacts securely'
  const buttonText = isLogin ? 'Sign In' : 'Sign Up'
  const alternateText = isLogin 
    ? "Don't have an account? " 
    : "Already have an account? "
  const alternateLink = isLogin 
    ? { to: '/register', text: 'Sign Up' } 
    : { to: '/login', text: 'Sign In' }

  return (
    <motion.form 
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-lg p-8 bg-gray-900 border border-gray-800 shadow-md mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className=" mb-8 text-center"
        variants={itemVariants}
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-gray-400">{subtitle}</p>
      </motion.div>

      {!isLogin && (
        <motion.div variants={itemVariants}>
          <Input
            id="displayName"
            type="text"
            label="Username"
            placeholder="Chose a username"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            error={errors?.displayName}
            required
            icon={<FiUser />}
            autoComplete="name"
          />
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors?.email}
          required
          icon={<FiMail />}
          autoComplete={isLogin ? "email" : "new-email"}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder={isLogin ? "Enter your password" : "Create a password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors?.password}
          required
          icon={<FiLock />}
          autoComplete={isLogin ? "current-password" : "new-password"}
        />
      </motion.div>

      {isLogin && (
        <motion.div 
          className="flex justify-end mb-6" 
          variants={itemVariants}
        >
          <Link to="/forgot-password" className="text-sm text-primary-400 transition-colors duration-200">
            Forgot Password?
          </Link>
        </motion.div>
      )}

      <motion.div 
        className="mb-6" 
        variants={itemVariants}
      >
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          loading={loading}
        >
          {buttonText}
        </Button>
      </motion.div>

      <motion.div 
        className="text-center text-gray-400"
        variants={itemVariants}
      >
        <p>
          {alternateText}
          <Link to={alternateLink.to} className="link">
            {alternateLink.text}
          </Link>
        </p>
      </motion.div>
    </motion.form>
  )
}

export default AuthForm


// now enhance the dashaboard and make it so professional and functional, so classy, well organized and responsive, looking sleek, make sure it retrieves list of contacts for the authenticated user and a search bar functionality to search from the retrieved list, also add a sort option to sort contacts based on alphabets or date added, if user has no contacts, show a user friendly message and a user friendly call to action button to ask user to add contact, when a user click on it, it should show him a ui, or modal to add the contact details, this modal/ui should be user friendly, and should have inputs like, contact name, phone number, email (optional), notes (optional) and a button to save contact, make sure it is functional, and it save these informations in a firestore collection, with addtitional info like userId, date, and more, when retrieving, then retreive from the collection where userid is the authenticated user id