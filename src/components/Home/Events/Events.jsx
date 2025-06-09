import { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";

export default function Events() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (remove this in production)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
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

  return (
    <>
      <div className="events">
        <div className="BGLayer"></div>
        <div className="container-fluid">
          <div className="eventsInner row">
            <div className="EVHeader col-12">
              <h2>حاجات تحب تشوفها</h2>
            </div>
            <div className="event col-10 col-lg-4">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/dtp6P7Mwjfw?si=YBvNYwz3KHdueuxf"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div className="event col-10 col-lg-4">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/x_2MkTiIAx4?si=MEWmrsZmc-JPi6J4"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
