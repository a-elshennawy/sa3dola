import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function Youtube() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch("/.netlify/functions/get-youtube-videos");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        setError("شناوي معاه حوار .. تعالا وقت تاني");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div className="text-center py-5">جاري التحميل...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  return (
    <div className="YT">
      <div className="container-fluid">
        <div className="YTInner row">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="YTHeader col-12"
          >
            <h2>اليوتيوب بتاعنا</h2>
          </motion.div>

          {videos.map((video) => (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: "easeInOut" }}
              key={video.id}
              className="YTVid col-10 col-lg-5"
            >
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
