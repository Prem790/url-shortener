import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { ClipboardDocumentIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/urls/shorten', {
        originalUrl: url,
        customSlug
      });
      setShortUrl(response.data.shortUrl);
      setQrCode(response.data.qrCode);
      toast.success('URL shortened successfully!');
    } catch (error) {
      console.error('Error shortening URL:', error.response?.data || error.message);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError('Failed to shorten URL');
        toast.error('Failed to shorten URL');
      }
    }
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
              className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      {error && (
        <div className="bg-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      {shortUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-primary text-text px-4 py-3 rounded-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-primary text-lg font-semibold">
                {shortUrl}
              </a>
              <ClipboardDocumentIcon
                className="h-6 w-6 text-primary cursor-pointer"
                onClick={copyToClipboard}
              />
            </div>
            <QrCodeIcon
              className="h-6 w-6 text-primary cursor-pointer"
              onClick={toggleQRCode}
            />
          </div>
          {showQR && qrCode && <img src={qrCode} alt="QR Code" className="w-32 h-32" />}
        </motion.div>
      )}
      <Toaster />
    </motion.div>
  );
};

export default UrlShortener;

