import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { currentUser, logout } = useAuth();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setProfileDropdown(false);
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setProfileDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="bg-[#1E1E1E] text-white shadow-md relative z-10"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-[#6C63FF]">
            ClipLink
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/yt-downloader">
              <svg
                className="w-5 h-5 mr-1 inline"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              YT Downloader
            </NavLink>
            <NavLink to="/mini-url">
              <svg
                className="w-5 h-5 mr-1 inline"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.828 11.172a4 4 0 010-5.656l4-4a4 4 0 015.656 5.656l-2 2a1 1 0 01-1.414-1.414l2-2a2 2 0 10-2.828-2.828l-4 4a2 2 0 002.828 2.828 1 1 0 011.414 1.414 4 4 0 01-5.656 0zM13.172 12.828a4 4 0 010 5.656l-4 4a4 4 0 11-5.656-5.656l2-2a1 1 0 111.414 1.414l-2 2a2 2 0 102.828 2.828l4-4a2 2 0 00-2.828-2.828 1 1 0 01-1.414-1.414 4 4 0 015.656 0z" />
              </svg>
              Mini-URL
            </NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>

            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={currentUser.photoURL || "/default-profile.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{currentUser.displayName || "User"}</span>
                </button>

                <AnimatePresence>
                  {profileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-[#2B2B2B] text-white shadow-lg rounded-lg z-50"
                    >
                      <ul>
                        <li>
                          <Link 
                            to="/profile" 
                            className="block py-2 px-4 hover:bg-[#3B3B3B] cursor-pointer"
                            onClick={() => setProfileDropdown(false)}
                          >
                            View Profile
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/account-settings" 
                            className="block py-2 px-4 hover:bg-[#3B3B3B] cursor-pointer"
                            onClick={() => setProfileDropdown(false)}
                          >
                            Account Settings
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/edit-profile" 
                            className="block py-2 px-4 hover:bg-[#3B3B3B] cursor-pointer"
                            onClick={() => setProfileDropdown(false)}
                          >
                            Edit Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left py-2 px-4 cursor-pointer bg-[#6C63FF] hover:bg-[#524bb8] rounded-b-lg transition-all duration-200"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#6C63FF] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
                    type="submit"
                  >
                    Register
                  </motion.button>
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-[#6C63FF]" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-[#6C63FF]" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden mt-4 space-y-3 bg-[#1E1E1E] rounded-lg shadow-lg p-4"
            >
              <motion.div variants={itemVariants}>
                <NavLink to="/yt-downloader">YT Downloader</NavLink>
              </motion.div>
              <motion.div variants={itemVariants}>
                <NavLink to="/mini-url">Mini-URL</NavLink>
              </motion.div>
              <motion.div variants={itemVariants}>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </motion.div>
              {!currentUser ? (
                <>
                  <motion.div variants={itemVariants}>
                    <NavLink to="/login">Login</NavLink>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link to="/register" className="inline-block">
                      <button className="w-full bg-[#6C63FF] hover:bg-opacity-90 text-white font-bold py-2 rounded transition-colors duration-300">
                        Register
                      </button>
                    </Link>
                  </motion.div>
                </>
              ) : (
                <motion.div variants={itemVariants}>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left bg-[#6C63FF] hover:bg-[#524bb8] text-white py-2 px-4 rounded transition-colors duration-300"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-white hover:text-[#6C63FF] font-medium transition-colors duration-300"
  >
    {children}
  </Link>
);

export default Header;