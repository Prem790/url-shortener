// frontend/src/components/VisitHistory.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const VisitHistory = () => {
  const [visitHistory, setVisitHistory] = useState([]);

  useEffect(() => {
    const fetchVisitHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/urls/history');
        setVisitHistory(response.data);
      } catch (error) {
        toast.error('Failed to load visit history');
        console.error('Error fetching visit history:', error);
      }
    };

    fetchVisitHistory();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6 text-primary">Visit History</h1>
      <div className="bg-surface shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Short URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Visit Count</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Visit History</th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-700">
            {visitHistory.map((url, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{`https://mini-url/${url.customSlug}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{url.visitCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <ul>
                    {url.visitHistory.map((visit, idx) => (
                      <li key={idx}>{new Date(visit).toLocaleString()}</li>
                    ))}
                  </ul>
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

export default VisitHistory;
