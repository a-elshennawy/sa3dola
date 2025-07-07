import { motion } from "motion/react";

export default function Intro() {
  return (
    <>
      <div className="intro">
        <div className="container-fluid">
          <div className="introInner row">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="textSide col-10"
            >
              <h2>عزيزي .. انت هنا ؟ إذاً انت مميز</h2>
            </motion.div>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="imgSide col-10 col-lg-4"
            >
              <div className="kickDirection">
                <a href="https://kick.com/sa3dola" target="_blank">
                  <img
                    src="/images/Kick-logo-green-k.webp"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </a>
              </div>
              <img src="/images/2.webp" />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
