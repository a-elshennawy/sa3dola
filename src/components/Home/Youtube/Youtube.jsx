import { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";

export default function Youtube() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading time (remove this in production)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/.netlify/functions/get-youtube-videos");
        const data = await response.json();
        setVideos(data);
        setLoading(false);
      } catch (err) {
        setError("شناوي معاه حوار .. تعالا وقت تاني");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "50px" }}
      >
        <PacmanLoader color="#00fd15" />
      </div>
    );
  }
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
