import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const YTVideoDownloader = () => {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVideoInfo(null);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/youtube/info",
        {
          params: { url },
        }
      );
      setVideoInfo(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch video information";
      toast.error(errorMessage);
      console.error("Error details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (itag) => {
    try {
      const downloadToast = toast.loading('Preparing download...');
      
      const response = await axios({
        url: 'http://localhost:5000/api/youtube/download',
        method: 'GET',
        responseType: 'blob', // Important for handling the video file
        timeout: 300000, // 5 minute timeout
        params: {
          url,
          itag
        }
      });

      const contentType = response.headers['content-type'];
      const extension = contentType.includes('video/mp4') ? 'mp4' : 'webm';
      
      const blob = new Blob([response.data], { 
        type: response.headers['content-type'] 
      });
      const downloadUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger the download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `video-${Date.now()}.mp4`; // You can customize the filename
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      
      toast.dismiss(downloadToast);
      toast.success('Download started!');
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'Download failed. Please try again.');
      console.error('Download error:', error);
    }
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 px-4 sm:px-0"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-surface shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-text text-sm font-bold mb-2"
            htmlFor="url"
          >
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
          <img
            src={videoInfo.thumbnail}
            alt={videoInfo.title}
            className="w-full rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">Download Options:</h3>
          <div className="grid grid-cols-2 gap-2">
            {videoInfo.formats
              .filter(
                (format, index, self) =>
                  index === self.findIndex((f) => f.itag === format.itag) // Filter out duplicate itags
              )
              .map((format) => (
                <motion.button
                  key={format.itag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDownload(format.itag)}
                >
                  {format.quality} - {format.mimeType.split(";")[0]}
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
