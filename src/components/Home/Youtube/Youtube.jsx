import { useState, useEffect } from "react";

export default function Youtube() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add this line

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true); // Set loading to true when starting
        const response = await fetch("/.netlify/functions/get-youtube-videos");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        setError("شناوي معاه حوار .. تعالا وقت تاني");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false); // Always set loading to false when done
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div className="text-center py-5">جاري التحميل...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  return (
    <div className="YT">
      <div className="BGLayer"></div>
      <div className="container-fluid">
        <div className="YTInner row">
          <div className="YTHeader col-12">
            <h2>اليوتيوب بتاعنا</h2>
          </div>

          {videos.map((video) => (
            <div key={video.id} className="YTVid col-10 col-lg-4">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
          <div className="YTFooter col-10">
            <button className="moreBtn">
              <a href="https://www.youtube.com/@Sa3dola/videos" target="_blank">
                كل ما يخص الزعيم سعدولا والالعاب والمغامرات التي تحدث في
                اللايفات و الكثير و الكثير 🎈😂
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
