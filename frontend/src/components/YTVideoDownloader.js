import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const YTVideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`https://youtube.com/oembed?url=${url}&format=json`);
      const data = await response.json();
      // After fetching videoInfo in the handleSubmit function
setVideoInfo({
  title: data.title,
  thumbnail: data.thumbnail_url,
  qualities: ['240p', '360p', '720p', '1080p'], // Replace with actual qualities from backend response
});

    } catch (error) {
      toast.error('Failed to fetch video information');
    }
    setLoading(false);
  };

  /*

  const handleDownload = (quality) => {
    // TODO: Implement actual download logic
    toast.success(`Downloading ${videoInfo.title} in ${quality}`);
  };

  */

  const handleDownload = (quality) => {
    const downloadUrl = `http://localhost:5000/api/youtube/download?url=${encodeURIComponent(url)}&quality=${quality}`;
    window.open(downloadUrl);
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
            YouTube Video URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
            id="url"
            type="url"
            placeholder="Enter YouTube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-10 w-full rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Get Download Options
          </motion.button>
        </div>
      </form>
      {loading && (
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-2 text-text">Fetching video information...</p>
        </div>
      )}
      {videoInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-primary text-text px-4 py-3 rounded-lg"
        >
          <h2 className="text-xl font-bold mb-2">{videoInfo.title}</h2>
          <img src={videoInfo.thumbnail} alt={videoInfo.title} className="w-full rounded-lg mb-4" />
          <h3 className="text-lg font-semibold mb-2">Download Options:</h3>
          <div className="grid grid-cols-2 gap-2">
            {videoInfo.qualities.map((quality) => (
              <motion.button
                key={quality}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleDownload(quality)}
              >
                {quality}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
      <Toaster />
    </motion.div>
  );
};

export default YTVideoDownloader;