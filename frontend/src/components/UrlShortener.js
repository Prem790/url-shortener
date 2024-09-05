import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { ClipboardDocumentIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import QRCode from 'qrcode.react';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call
    const baseUrl = 'https://mini-url/';
    const generatedSlug = customSlug || Math.random().toString(36).substr(2, 6);
    setShortUrl(baseUrl + generatedSlug);
    toast.success('URL shortened successfully!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('Copied to clipboard!');
  };

  const toggleQRCode = () => {
    setShowQR(!showQR);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 px-4 sm:px-0"
    >
      <form onSubmit={handleSubmit} className="bg-surface shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-text text-sm font-bold mb-2" htmlFor="url">
            URL to shorten
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            id="url"
            type="url"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-text text-sm font-bold mb-2" htmlFor="customSlug">
            Your Custom URL
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              https://mini-url/
            </span>
            <input
              className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              id="customSlug"
              placeholder="custom-name"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Shorten
          </motion.button>
        </div>
      </form>
      {shortUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-primary text-text px-4 py-3 rounded-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <strong className="font-bold">Shortened URL:</strong>
              <span className="text-primary">{shortUrl}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="text-primary hover:text-primary-light transition-colors duration-200"
                title="Copy to clipboard"
              >
                <ClipboardDocumentIcon className="h-5 w-5" />
              </button>
              <button
                onClick={toggleQRCode}
                className="text-primary hover:text-primary-light transition-colors duration-200"
                title="Generate QR Code"
              >
                <QrCodeIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          {showQR && (
            <div className="mt-4 flex justify-center">
              <QRCode value={shortUrl} size={128} bgColor="#1E1E1E" fgColor="#6C63FF" level="L" />
            </div>
          )}
        </motion.div>
      )}
      <Toaster />
    </motion.div>
  );
};

export default UrlShortener;