const axios = require("axios");
const { parseString } = require("xml2js");

exports.handler = async (event) => {
  try {
    // 1. Fetch YouTube RSS feed (works with @username or channel ID)
    const channelName = "UC7v4yyZtL2EQEO9lO4kafYw"; // From youtube.com/@Sa3dola
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelName}`;
    const response = await axios.get(rssUrl);

    // 2. Parse XML to JSON
    const videos = await new Promise((resolve, reject) => {
      parseString(response.data, (err, result) => {
        if (err) reject(err);

        // Extract latest 3 videos
        const latestVideos = result.feed.entry.slice(0, 4).map((video) => ({
          id: video["yt:videoId"][0], // Video ID for iframe
          title: video.title[0], // Video title (optional)
        }));
        resolve(latestVideos);
      });
    });

    // 3. Return videos to React
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" }, // Fix CORS
      body: JSON.stringify(videos),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch videos" }),
    };
  }
};
