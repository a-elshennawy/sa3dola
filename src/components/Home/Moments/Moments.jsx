import { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";

export default function Moments() {
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
      <div className="moments">
        <div className="BGLayer"></div>
        <div className="container-fluid">
          <div className="momentsInner row">
            <div className="MHeader col-10">
              <h2>لحظات لا تنسى</h2>
            </div>
            <div className="MContent col-10 col-lg-5">
              <h4>بيسنجل على العيال يجدعان</h4>
              <video autoPlay muted loop>
                <source src="/videos/moment_one.mp4" />
              </video>
            </div>
            <div className="MContent col-10 col-lg-5">
              <h4>بيرقص السكواد في الاوبن</h4>
              <video autoPlay muted loop>
                <source src="/videos/moment_two.mp4" />
              </video>
            </div>
            <div className="MContent col-10 col-lg-5">
              <h4>جولد ؟</h4>
              <video autoPlay muted loop>
                <source src="/videos/moment_three.mp4" />
              </video>
            </div>
            <div className="MContent col-10 col-lg-5">
              <h4>ينهار اسود !!</h4>
              <video autoPlay muted loop>
                <source src="/videos/moment_four.mp4" />
              </video>
            </div>
            <div className="MFooter col-12">
              <h3>الكلام دا بيحصل هنا</h3>
              <a href="https://kick.com/sa3dola" target="_blank">
                <h1>kick</h1>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
