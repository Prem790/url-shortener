import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { signInWithEmailAndPassword  , updateProfile} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigae = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call for login
   

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(result.user,{
        displayName: formData.name
      })
      console.log(result);
      toast.success(`Log In successful!. Welcome ${formData.name}`);
      navigae("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed: " + error.message);

    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-surface shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Login
        </h2>
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
        <div className="mb-6">
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
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </motion.button>
          <Link
            to="/register"
            className="inline-block align-baseline font-bold text-sm text-primary hover:text-opacity-80 ml-9"
          >
            Don't have an account?
          </Link>
        </div>
      </form>
      <Toaster />
    </motion.div>
  );
};

export default Login;
