import { motion } from "motion/react";

export default function Moments() {
  return (
    <div className="moments">
      <div className="container-fluid">
        <div className="momentsInner row">
          <motion.div
            className="MHeader col-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2>لحظات لا تنسى</h2>
          </motion.div>

          {[
            {
              title: "بيسنجل على العيال يجدعان",
              video: "/videos/moment_one.mp4",
            },
            {
              title: "بيرقص السكواد في الاوبن",
              video: "/videos/moment_two.mp4",
            },
            { title: "جولد ؟", video: "/videos/moment_three.mp4" },
            { title: "ينهار اسود !!", video: "/videos/moment_four.mp4" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="MContent col-10 col-lg-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.15,
                ease: "backOut",
              }}
            >
              <h4>{item.title}</h4>
              <video autoPlay muted loop playsInline>
                <source src={item.video} type="video/mp4" />
              </video>
            </motion.div>
          ))}

          <motion.div
            className="MFooter col-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3>الكلام دا بيحصل هنا</h3>
            <a
              href="https://kick.com/sa3dola"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h1>kick</h1>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
