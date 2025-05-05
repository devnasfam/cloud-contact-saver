import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCloud, FiSearch, FiShield, FiSmartphone, FiFilter, FiStar, FiCheck } from 'react-icons/fi'

const features = [
  {
    icon: <FiShield className="text-primary-400" size={24} />,
    title: "Secure Storage",
    description: "Your contacts are encrypted and stored safely in the cloud, protected from loss or theft."
  },
  {
    icon: <FiSearch className="text-primary-400" size={24} />,
    title: "Smart Search",
    description: "Find any contact instantly with our powerful search and filtering system."
  },
  {
    icon: <FiSmartphone className="text-primary-400" size={24} />,
    title: "Device Independent",
    description: "Access your contacts from any device, anywhere, without relying on SIM cards."
  },
  {
    icon: <FiFilter className="text-primary-400" size={24} />,
    title: "Advanced Filtering",
    description: "Organize and sort your contacts exactly how you want them."
  },
  {
    icon: <FiStar className="text-primary-400" size={24} />,
    title: "Unlimited Storage",
    description: "Store as many contacts as you need with our unlimited cloud storage."
  },
  {
    icon: <FiCloud className="text-primary-400" size={24} />,
    title: "Real-time Sync",
    description: "All your changes are instantly synchronized across all your devices."
  }
]

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <header className="relative px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="flex justify-center mb-8">
              <div className="p-3 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/50">
                <FiCloud className="text-6xl text-primary-400" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Cloud Contact Saver
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Your contacts, securely stored in the cloud. Access them anywhere, anytime, from any device.
            </p>
            
            <div className="flex w-full md:px-28 flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-3 rounded-xl hover:scale-105 transform transition-all duration-200"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="btn-secondary text-lg px-8 py-3 rounded-xl hover:scale-105 transform transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-400/5 to-accent-400/5 backdrop-blur-3xl" />
      </header>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Manage Contacts
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A complete solution for storing and managing your contacts in the cloud, with all the features you need.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-primary-400/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gray-700/50 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose Cloud Contact Saver?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Never lose your contacts again. Keep them safe, organized, and accessible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-400/10 rounded-lg flex items-center justify-center shrink-0">
                  <FiCheck className="text-primary-400" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Device Independent Storage</h3>
                  <p className="text-gray-400">
                    No more relying on SIM cards or device storage. Your contacts are safely stored in the cloud.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-400/10 rounded-lg flex items-center justify-center shrink-0">
                  <FiCheck className="text-primary-400" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Instant Access</h3>
                  <p className="text-gray-400">
                    Access your contacts instantly from any device with an internet connection.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-400/10 rounded-lg flex items-center justify-center shrink-0">
                  <FiCheck className="text-primary-400" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
                  <p className="text-gray-400">
                    Your data is encrypted and protected. Only you can access your contacts.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Get Started in Minutes</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-400/20 flex items-center justify-center text-primary-400 font-semibold">
                    1
                  </div>
                  <p className="text-gray-300">Create your free account</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-400/20 flex items-center justify-center text-primary-400 font-semibold">
                    2
                  </div>
                  <p className="text-gray-300">Add your contacts</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-400/20 flex items-center justify-center text-primary-400 font-semibold">
                    3
                  </div>
                  <p className="text-gray-300">Access them anywhere</p>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  to="/register"
                  className="btn-primary w-full text-center p-3 rounded-xl hover:scale-105 transform transition-all duration-200"
                >
                  Create Free Account
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-400/10 to-accent-400/10 backdrop-blur-sm border border-primary-400/20 rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Secure Your Contacts?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Cloud Contact Saver to keep their contacts safe and accessible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-3 rounded-xl hover:scale-105 transform transition-all duration-200"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="btn-secondary text-lg px-8 py-3 rounded-xl hover:scale-105 transform transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <FiCloud className="text-primary-400" />
            <span className="text-gray-400">© 2024 Cloud Contact Saver. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing