const axios = require("axios");
const { parseString } = require("xml2js");

exports.handler = async (event) => {
  try {
    const channelId = "UC7v4yyZtL2EQEO9lO4kafYw";
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    const response = await axios.get(rssUrl, {
      headers: {
        Accept: "application/xml",
        "User-Agent": "Mozilla/5.0",
      },
    });

    const videos = await new Promise((resolve, reject) => {
      parseString(response.data, (err, result) => {
        if (err) return reject(err);

        if (!result.feed.entry) {
          return resolve([]);
        }

        const latestVideos = result.feed.entry.slice(0, 1).map((video) => ({
          id: video["yt:videoId"][0],
          title: video.title[0],
        }));
        resolve(latestVideos);
      });
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
      body: JSON.stringify(videos),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch videos",
        details: err.message,
      }),
    };
  }
};
