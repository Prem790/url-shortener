import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", { duration: 5000 });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Set display name and placeholder photoURL with the first initial for email sign-ups
      const firstInitial = formData.name.charAt(0).toUpperCase(); // Get the first letter of the name
      await updateProfile(result.user, {
        displayName: formData.name,
        photoURL: `https://ui-avatars.com/api/?name=${firstInitial}&background=random`, // Generate an avatar image with initials
      });

      // Show success message for 5 seconds
      toast.success(`Registration successful! Welcome ${formData.name}`, {
        duration: 5000,
      });

      // Navigate to home page immediately after successful registration
      navigate("/");

      // Optionally, you could also force a reload to reflect profile updates immediately
      window.location.reload();
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed: " + error.message, { duration: 5000 });
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success(`Welcome ${result.user.displayName}!`, {
        duration: 5000,
      });
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In failed:", error);
      toast.error("Google Sign-In failed: " + error.message, { duration: 5000 });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 p-4 sm:p-6"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-surface shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Register
        </h2>
        <div className="mb-4">
          <label
            className="block text-text text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-text text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            id="email"
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-text text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            id="password"
            type="password"
            name="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-text text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
            type="submit"
          >
            Register
          </motion.button>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-primary hover:text-opacity-80"
            >
              Already have an account?
            </Link>
          </div>
        </div>
        <span className="text-gray-500 justify-center items-center flex">OR</span>

        {/* Google Sign-In Button */}
        <div className="mt-6 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#4A90E2] hover:bg-[#357ABD] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center gap-2 w-full sm:w-auto"
            onClick={handleGoogleSignIn}
            type="button"
          >
            {/* Google Icon */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M24 9.5c3.42 0 6.26 1.19 8.34 3.12l6.19-6.19C34.87 3.32 29.85 1.5 24 1.5 14.39 1.5 6.54 7.5 3.47 15.73l7.29 5.64C12.47 15.62 17.75 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.93 24.63c0-1.67-.15-3.26-.42-4.81H24v9.09h12.89c-.55 2.84-2.16 5.22-4.6 6.83l7.27 5.64C43.41 36.63 46.93 30.97 46.93 24.63z"
              />
              <path
                fill="#FBBC05"
                d="M10.76 28.3a14.65 14.65 0 01-.76-4.3c0-1.5.27-2.94.76-4.3l-7.29-5.64A22.36 22.36 0 001.07 24c0 3.69.89 7.18 2.47 10.3l7.22-5.64z"
              />
              <path
                fill="#EA4335"
                d="M24 46.5c5.85 0 10.79-1.94 14.39-5.28l-7.27-5.64c-2.02 1.35-4.57 2.15-7.12 2.15-6.24 0-11.5-4.12-13.38-9.73l-7.29 5.64C6.54 40.5 14.39 46.5 24 46.5z"
              />
            </svg>
            Sign in with Google
          </motion.button>
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </motion.div>
  );
};

export default Register;
