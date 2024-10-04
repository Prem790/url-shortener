const ytdl = require('ytdl-core');

exports.downloadVideo = async (req, res) => {
  const videoURL = req.query.url;
  const requestedQuality = req.query.quality || 'highest';

  if (!videoURL) {
    return res.status(400).json({ error: 'YouTube video URL is required' });
  }

  try {
    // Fetch video information
    const videoInfo = await ytdl.getInfo(videoURL);

    // Get all video and audio formats
    const formats = ytdl.filterFormats(videoInfo.formats, 'videoandaudio');
    
    // Log the available formats for debugging
    console.log('Available formats:', formats.map(format => ({
      qualityLabel: format.qualityLabel, // Check what actual labels are returned
      itag: format.itag,
      mimeType: format.mimeType,
    })));

    const videoTitle = videoInfo.videoDetails.title.replace(/[^\w\s]/gi, ''); // Sanitize title

    // Find the format based on the requested quality
    const format = formats.find(f => f.qualityLabel === requestedQuality);

    if (!format) {
      return res.status(400).json({ error: `The requested quality ${requestedQuality} is not available.` });
    }

    // Set headers to force the browser to download the video
    res.header('Content-Disposition', `attachment; filename="${videoTitle}-${requestedQuality}.mp4"`);

    // Pipe the video stream to the response
    ytdl(videoURL, { format }).pipe(res);

  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).json({ error: 'Failed to download video' });
  }
};
