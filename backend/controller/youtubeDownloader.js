const ytdl = require('ytdl-core');

exports.getVideoInfo = async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ message: 'Invalid YouTube URL' });
    }

    const videoInfo = await ytdl.getInfo(url);
    
    const videoDetails = {
      title: videoInfo.videoDetails.title,
      thumbnail: videoInfo.videoDetails.thumbnails[0].url,
      formats: videoInfo.formats
        .filter(format => format.hasVideo)
        .map(format => ({
          quality: format.qualityLabel,
          mimeType: format.mimeType,
          itag: format.itag,
        })),
    };

    res.json(videoDetails);
  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch video information' });
  }
};

exports.downloadVideo = async (req, res) => {
  try {
    const { url, itag } = req.query;
    
    if (!url || !itag) {
      return res.status(400).json({ message: 'URL and itag are required' });
    }

    const videoURL = decodeURIComponent(url);
    
    if (!ytdl.validateURL(videoURL)) {
      return res.status(400).json({ message: 'Invalid YouTube URL' });
    }

    const info = await ytdl.getInfo(videoURL);
    const format = ytdl.chooseFormat(info.formats, { quality: itag });

    if (!format) {
      return res.status(400).json({ message: 'No format found with the specified itag' });
    }

    // Set appropriate headers
    res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title.replace(/[^\w\s-]/gi, '')}.${format.container}"`);
    res.header('Content-Type', format.mimeType);
    
    // Create the video stream
    const videoStream = ytdl(videoURL, {
      format: format,
      filter: 'audioandvideo',
    });

    // Handle potential errors
    videoStream.on('error', (err) => {
      console.error('Stream error:', err);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error during video download' });
      }
    });

    // Pipe the video stream to the response
    videoStream.pipe(res);

  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).json({ message: error.message || 'Failed to download video' });
  }
};