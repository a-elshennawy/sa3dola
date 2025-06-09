import { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";

export default function Intro() {
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
      <div className="intro">
        <div className="container-fluid">
          <div className="introInner row">
            <div className="textSide col-10">
              <h2>عزيزي .. انت هنا ؟ إذاً انت مميز</h2>
            </div>
            <div className="imgSide col-10 col-lg-4">
              <div className="kickDirection">
                <a href="https://kick.com/sa3dola" target="_blank">
                  <img src="/images/Kick-logo-green-k.webp" />
                </a>
              </div>
              <img src="/images/2.webp" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
