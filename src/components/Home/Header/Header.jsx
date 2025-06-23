import { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faWhatsapp,
  faInstagram,
  faTiktok,
  faXTwitter,
  faDiscord,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Header() {
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
      <div className="header">
        <div className="container-fluid">
          <div className="vidContainer">
            <video loop muted autoPlay>
              <source src="/videos/header.mp4" />
            </video>
            <div className="blacklayer"></div>
          </div>
          <div className="textContainer">
            <h2>أهلا بيك في منتجع الزعيم</h2>
            <h1>سعدولا</h1>
            <div className="socials row">
              <div className="socialsHeader col-12">
                <h1>احنا فين ؟</h1>
                <a href="https://kick.com/sa3dola" target="_blank">
                  <h1>kick</h1>
                </a>
              </div>
              <div className="socialsContent col-12 row">
                <span className="col-5 col-lg-1 youtube">
                  <a href="https://www.youtube.com/@Sa3dola" target="_blank">
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                </span>
                <span className="col-5 col-lg-1 facebook">
                  <a href="https://www.facebook.com/Sa3dolaa/" target="_blank">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </span>
                <span className="col-5 col-lg-1 whatsapp">
                  <a
                    href="https://www.whatsapp.com/channel/0029Vabs0vI4IBhL0ZMqwT07"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </a>
                </span>
                <span className="col-5 col-lg-1 instagram">
                  <a href="https://www.instagram.com/sa3dolaa" target="_blank">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </span>
                <span className="col-5 col-lg-1 tiktok">
                  <a href="https://www.tiktok.com/@sa3dollaa" target="_blank">
                    <FontAwesomeIcon icon={faTiktok} />
                  </a>
                </span>
                <span className="col-5 col-lg-1 x">
                  <a href="https://x.com/sa3dolaa" target="_blank">
                    <FontAwesomeIcon icon={faXTwitter} />
                  </a>
                </span>
                <span className="col-5 col-lg-1 discord">
                  <a
                    href="https://discord.com/invite/E6eZjb7YhW"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faDiscord} />
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
