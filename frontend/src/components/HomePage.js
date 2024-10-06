import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LinkIcon, 
  VideoCameraIcon, 
  ChartBarSquareIcon, 
  UserPlusIcon, 
  PencilSquareIcon, 
  CursorArrowRaysIcon 
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const navigate = useNavigate();

  const dashboardFeatures = [
    {
      name: "Link Management",
      icon: LinkIcon,
      description: "View and manage both original and shortened links in one place.",
    },
    {
      name: "Quick Actions",
      icon: PencilSquareIcon,
      description: "Edit or delete your shortened links with convenient action buttons.",
    },
    {
      name: "Click Analytics",
      icon: ChartBarSquareIcon,
      description: "Track performance with detailed click statistics for each link.",
    },
    {
      name: "Easy Authentication",
      icon: UserPlusIcon,
      description: "One-click login or register with Google for seamless access.",
    },
  ];

  return (
    <div className="relative  min-h-screen text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        
        {/* Animated circles */}
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-indigo-500 opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
            }}
            animate={{
              scale: [1, 2, 1],
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Rest of the content remains the same */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative h-24"
          >
            <motion.h1
              className="absolute w-full text-5xl font-bold"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Welcome to{' '}
              <motion.span
                className="text-indigo-500"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                ClipLink
              </motion.span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Feature Cards Section */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {/* URL Shortener Card */}
          <motion.div
            className="w-96 bg-indigo-600/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <LinkIcon className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center">URL Shortener</h2>
              <p className="text-gray-200 mb-6 text-center">
                Transform long URLs into concise, shareable links. 
                Perfect for social media, messaging, and more!
              </p>
              <button
                onClick={() => navigate('/mini-url')}
                className="w-full bg-white text-indigo-600 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Shortening
              </button>
            </div>
          </motion.div>

          {/* YouTube Downloader Card */}
          <motion.div
            className="w-96 bg-red-600/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <VideoCameraIcon className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center">YouTube Downloader</h2>
              <p className="text-gray-200 mb-6 text-center">
                Download your favorite YouTube videos in various formats and quality options.
                Fast, simple, and reliable!
              </p>
              <button
                onClick={() => navigate('/yt-downloader')}
                className="w-full bg-white text-red-600 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Downloading
              </button>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-2">The Most Powerful Dashboard Ever</h2>
          <p className="text-gray-400 text-center mb-8">Experience these amazing features in your personalized dashboard</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dashboardFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.name}
                  className="flex items-start p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex-shrink-0 bg-indigo-500 rounded-full p-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* One-Click Authentication Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">One-Click Authentication</h2>
          <p className="text-gray-400 mb-6">
            Sign up or log in effortlessly with our Google integration. 
            Experience a seamless authentication process with just a single click!
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;