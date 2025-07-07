import { motion } from "motion/react";
export default function Events() {
  return (
    <>
      <div className="events">
        <div className="container-fluid">
          <div className="eventsInner row">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
              className="EVHeader col-12"
            >
              <h2>حاجات تحب تشوفها</h2>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
              className="event col-10 col-lg-4"
            >
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
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
              className="event col-10 col-lg-4"
            >
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
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
