import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-surface mt-auto py-4"
    >
      <div className="container mx-auto px-6 text-center">
        <p className="text-text text-sm">
          © {new Date().getFullYear()} URL Shortener. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
