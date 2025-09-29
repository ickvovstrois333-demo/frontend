import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ServicePair from "../components/AnimationServicePair";

const rubberBandSlideInFromLeft = {
  hidden: { opacity: 0 },
  visible: {
    x: ["-120%", "220%", "0%"],  // keyframe positions
    opacity: [0, 1, 1],          // opacity keyframes
    transition: {
      duration: 4,
      ease: "easeOut",
      times: [0, 0.4, 1],       //keyframe percentages (0%, 40%, 100%)
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 3, ease: "easeOut", delay: 1.7 } }
};

const bgFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 4.2 // AFTER the slide/fade animations complete
    }
  }
};

// Title letters for build-up
const Services = () => {
  
  const { t } = useTranslation();
  const servicesList = t("services.serviceList", { returnObjects: true });
  
  const letterVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const titleLetters = t("services.intro.title").split("");

  if (!servicesList || !Array.isArray(servicesList)) return null;

  return (
    <div className="font-pf">
      <div className="relative min-h-[80vh] lg:min-h-screen overflow-hidden flex items-center justify-center">

        {/* Static Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/services-hero.jpg)" }}
        ></div>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-neutral/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-neutral-content flex flex-col items-center justify-center h-full p-6 md:p-12 lg:p-20 gap-6">

          {/* Title build-up */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold max-w-4xl flex flex-wrap justify-center leading-tight">
            {titleLetters.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle fade-in */}
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl max-w-4xl leading-snug font-ms"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            {t("services.intro.text")}
          </motion.h2>

          {/* "More" slide-up */}
          <motion.h3
            className="text-xl sm:text-2xl lg:text-3xl max-w-4xl font-light font-ms"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            {t("services.intro.text2")}
          </motion.h3>
        </div>
      </div>
      <div className="my-10">
        {/* Desktop */}
        <h2 className='text-4xl md:text-5xl lg:text-6xl text-primary p-4 text-center lg:mb-4'>
          {t("services.listTitle")}
        </h2>
        <div className="xl:max-w-[80vw] mx-auto hidden lg:block">
          <div className="container mx-auto px-4">
            {servicesList.map((service) => (
              <div className="relative w-full mt-6 min-h-[30vh]">
                {/* Background image layer */}
                <motion.div
                  className="absolute inset-0 bg-center bg-contain bg-repeat z-0 scale-100"
                  style={{ backgroundImage: `url(${service.image || "/services-hero.jpg"})` }}
                  variants={bgFadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                />

                {/* Foreground content */}
                <div className="relative flex flex-col md:flex-row w-full border-accent border-2 min-h-[30vh] items-stretch justify-between z-10">
                  {/* Left trapezoid */}
                  <div className="relative w-full md:w-1/2 lg:w-[40%] flex">
                    <motion.div
                      className={`clip-trapezoid-left h-full w-full text-primary px-16 py-6 text-l flex flex-col items-start gap-3 bg-info z-10 justify-evenly`}
                      variants={rubberBandSlideInFromLeft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div>
                        <h3 className="font-bold text-lg xl:text-2xl font-ms">{service.left.title}</h3>
                        <h3 className="indent-4 mt-4 text-md xl:text-xl font-ns-italic">{service.left.text}</h3>
                      </div>
                      <p className="text-md xl:text-xl font-ns">{service.left.description}</p>
                    </motion.div>
                  </div>

                  {/* Right trapezoid */}
                  <div className="relative w-full md:w-1/2 lg:w-[40%] flex">
                    <motion.div
                      className={`clip-trapezoid-right h-full w-full text-base-content ps-20 pe-4 py-6 text-md flex flex-col items-end gap-3 font-normal bg-white z-9 place-content-center`}
                      variants={fadeIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <ul className="list-disc ml-4 text-md xl:text-xl font-ns">
                        {service.right.tasks.map((task, i) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="mx-auto block lg:hidden join join-vertical w-full rounded-none">
          {servicesList.map((service, idx) => (
            <div
              key={idx}
              className="collapse collapse-arrow join-item border-base-300 border border-l-0 border-r-0 bg-  text-primary"
            >
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium flex items-center gap-3 font-pf">
                <img
                  src={service.image}
                  alt={service.left.title}
                  className="w-12 h-12 object-cover rounded-md"
                />
                {service.left.title}
              </div>
              <div className="collapse-content">
                <img
                  src={service.image}
                  className="object-contain rounded-md mb-4"
                />
                <p className="indent-4 mb-4 font-ns">{service.left.description}</p>
                <ul className="list-disc ml-4 indent-4 list-inside">
                  {service.right.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
                <p className="indent-4 mt-4 font-ns-italic">{service.left.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
