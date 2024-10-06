import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { ClipboardDocumentIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);

  // Fetch URLs on component mount
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/urls`); // Fixed here
        const data = await response.json();
        setUrls(data.urls);
      } catch (error) {
        console.error('Failed to fetch URLs', error);
      }
    };
    
    fetchUrls();
  }, []);

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('Copied to clipboard!');
  };

  const generateQRCode = (url) => {
    window.open(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`, '_blank'); // Fixed here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6 text-primary">Dashboard</h1>
      <div className="bg-surface shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Original URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Custom URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Clicks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-700">
            {urls.map((url, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{url.originalUrl}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{url.shortUrl}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{url.visitCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex space-x-2">
                  <ClipboardDocumentIcon
                    className="h-6 w-6 text-primary cursor-pointer"
                    onClick={() => copyToClipboard(url.shortUrl)}
                  />
                  <QrCodeIcon
                    className="h-6 w-6 text-primary cursor-pointer"
                    onClick={() => generateQRCode(url.shortUrl)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </motion.div>
  );
};

export default Dashboard;
