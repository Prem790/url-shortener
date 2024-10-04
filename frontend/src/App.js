import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import UrlShortener from './components/UrlShortener';
import Footer from './components/Footer';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import YTVideoDownloader from './components/YTVideoDownloader';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <AnimatePresence>
          <Routes>
            <Route 
              exact path="/" 
              element={
                <motion.main
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-grow container mx-auto px-6 py-8"
                >
                  <div className="container mx-auto px-6 py-8">
                    <UrlShortener />
                  </div>
                  <Features />
                </motion.main>
              } 
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/yt-downloader' element={<YTVideoDownloader/>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
