import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { currentUser, logout } = useAuth();
  const dropdownRef = useRef(null); // Reference to the dropdown menu

  const handleLogout = () => {
    logout();
    setProfileDropdown(false); // Close the dropdown after logout
  };

  // Function to handle clicks outside of the profile dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setProfileDropdown(false);
    }
  };

  // Add event listener for clicks outside of dropdown
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
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="bg-[#1E1E1E] text-white shadow-md"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-[#6C63FF]">
            MINI-URL
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
                      className="absolute right-0 mt-2 w-48 bg-[#2B2B2B] text-white shadow-lg rounded-lg"
                    >
                      <ul>
                        <li className="py-2 px-4 hover:bg-[#3B3B3B]">
                          <Link to="/profile">View Profile</Link>
                        </li>
                        <li className="py-2 px-4 hover:bg-[#3B3B3B]">
                          <Link to="/account-settings">Account Settings</Link>
                        </li>
                        <li className="py-2 px-4 hover:bg-[#3B3B3B]">
                          <Link to="/edit-profile">Edit Profile</Link>
                        </li>
                        <li
                          onClick={handleLogout}
                          className="py-2 px-4 cursor-pointer bg-[#6C63FF] hover:bg-[#524bb8] rounded-b-lg transition-all duration-200"
                        >
                          Logout
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
                <NavLink to="/dashboard">Dashboard</NavLink>
              </motion.div>
              {!currentUser ? (
                <>
                  <motion.div variants={itemVariants}>
                    <NavLink to="/login">Login</NavLink>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link to="/register" className="inline-block">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#6C63FF] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
                        type="submit"
                      >
                        Register
                      </motion.button>
                    </Link>
                  </motion.div>
                </>
              ) : (
                <motion.div variants={itemVariants}>
                  <button onClick={() => setProfileDropdown(!profileDropdown)}>
                    <img
                      src={currentUser.photoURL || "/default-profile.png"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    {currentUser.displayName || "User"}
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

const NavLink = ({ children, to, mobile = false }) => (
  <Link
    to={to}
    className={`text-white hover:text-[#6C63FF] transition-colors duration-300 ${
      mobile ? "block py-2 px-4 rounded-md hover:bg-[#121212]" : ""
    }`}
  >
    {children}
  </Link>
);

export default Header;
