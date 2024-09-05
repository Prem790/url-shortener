import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardDocumentIcon, QrCodeIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';

const Dashboard = () => {
  const [urls, setUrls] = useState([
    { id: 1, originalUrl: 'https://www.example.com', shortUrl: 'http://short.url/abc123', clicks: 42 },
    { id: 2, originalUrl: 'https://www.longwebsite.com/very/long/path', shortUrl: 'http://short.url/def456', clicks: 17 },
  ]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6 text-primary">Your Shortened URLs</h1>
      <div className="bg-surface shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Original URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Short URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Clicks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-700">
            {urls.map((url) => (
              <tr key={url.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{url.originalUrl}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{url.shortUrl}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{url.clicks}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => copyToClipboard(url.shortUrl)}
                    className="text-primary hover:text-primary-light mr-3"
                  >
                    <ClipboardDocumentIcon className="h-5 w-5" />
                  </button>
                  <button className="text-secondary hover:text-secondary-light mr-3">
                    <QrCodeIcon className="h-5 w-5" />
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-400">
                    <ChartBarIcon className="h-5 w-5" />
                  </button>
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
