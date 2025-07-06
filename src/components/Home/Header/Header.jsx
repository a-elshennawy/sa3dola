import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  FaYoutube,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaDiscord,
  FaRocketchat,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAuth } from "@clerk/clerk-react";
import { PacmanLoader } from "react-spinners";

export default function Header() {
  const { isSignedIn, isLoaded } = useAuth();

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
                <motion.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  href="https://kick.com/sa3dola"
                  target="_blank"
                >
                  <h1>kick</h1>
                </motion.a>
              </div>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="socialsContent col-12 row"
              >
                <span className="col-5 col-lg-1 youtube">
                  <a href="https://www.youtube.com/@Sa3dola" target="_blank">
                    <FaYoutube />
                  </a>
                </span>
                <span className="col-5 col-lg-1 facebook">
                  <a href="https://www.facebook.com/Sa3dolaa/" target="_blank">
                    <FaFacebookF />
                  </a>
                </span>
                <span className="col-5 col-lg-1 whatsapp">
                  <a
                    href="https://www.whatsapp.com/channel/0029Vabs0vI4IBhL0ZMqwT07"
                    target="_blank"
                  >
                    <FaWhatsapp />
                  </a>
                </span>
                <span className="col-5 col-lg-1 instagram">
                  <a href="https://www.instagram.com/sa3dolaa" target="_blank">
                    <FaInstagram />
                  </a>
                </span>
                <span className="col-5 col-lg-1 tiktok">
                  <a href="https://www.tiktok.com/@sa3dollaa" target="_blank">
                    <FaTiktok />
                  </a>
                </span>
                <span className="col-5 col-lg-1 x">
                  <a href="https://x.com/sa3dolaa" target="_blank">
                    <FaXTwitter />
                  </a>
                </span>
                <span className="col-5 col-lg-1 discord">
                  <a
                    href="https://discord.com/invite/E6eZjb7YhW"
                    target="_blank"
                  >
                    <FaDiscord />
                  </a>
                </span>
              </motion.div>
            </div>
          </div>
          <motion.span
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="toChat"
          >
            {isLoaded ? (
              <Link to={isSignedIn ? "/chat-room" : "/sign-up"}>
                <FaRocketchat />
              </Link>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "40px",
                  height: "40px",
                }}
              >
                <PacmanLoader size={20} color="#00fd15" />
              </div>
            )}
          </motion.span>
        </div>
      </div>
    </>
  );
}
