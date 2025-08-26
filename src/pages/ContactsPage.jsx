import React from "react";
import { FiPhoneCall, FiMail } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Contacts = () => {
  const { t } = useTranslation();

  const emailUser = "example";
  const emailDomain = "example.eu";
  const email = `${emailUser}@${emailDomain}`;

  // Detect screen size
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

  // Variants
  const heroVariants = {
    hidden: { opacity: 0, y: isDesktop ? 0 : 40, x: isDesktop ? -50 : 0 },
    show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.8 } },
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: isDesktop ? 0.95 : 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  const listVariants = {
    show: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="overflow-hidden pt-[15vh] min-h-[80vh] font-bn text-primary content-center">
      <div className="flex flex-col lg:flex-row bg-[radial-gradient(circle,theme(colors.secondary),theme(colors.white))]">

        {/* Contact details */}
        <motion.div
          className="min-h-[40vh] lg:w-1/2 text-center flex flex-col justify-center items-center p-6"
          variants={heroVariants}
          initial="hidden"
          animate="show"
        >
          <h1 className="text-5xl lg:text-7xl mb-6">{t("contacts.title")}</h1>
          <p className="text-3xl max-w-[80vw]">{t("contacts.text.normal")}</p>
          <b className="mb-6 ml-2 text-4xl text-neutral">
            {t("contacts.text.bold1")}, {t("contacts.text.bold2")} {t("contacts.text.bold3")}
          </b>

          <motion.div
            className="flex flex-col gap-6 w-full max-w-lg"
            variants={listVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h2 className="text-2xl lg:text-4xl flex items-center justify-center" variants={itemVariants}>
              <FiPhoneCall className="mx-2 text-neutral" />
              <b className="mx-2">{t("contacts.phone.note")}</b>
              {t("contacts.phone.value")}
            </motion.h2>

            <motion.h2 className="text-2xl lg:text-4xl flex items-center justify-center" variants={itemVariants}>
              <FiMail className="mx-2 text-neutral" />
              <b className="mx-2">{t("contacts.email.note")}</b>
              <a href={`mailto:${email}`} className="hover:underline break-all">{email}</a>
            </motion.h2>
          </motion.div>
        </motion.div>

        {/* Map */}
        <motion.div
          className="lg:w-1/2 w-full h-[300px] lg:h-auto lg:mx-10 mt-6 lg:mt-0"
          variants={mapVariants}
          initial="hidden"
          animate="show"
        >
          <iframe
            title="Business area"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93836.37935954207!2d23.241546740875236!3d42.69552878928868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia!5e0!3m2!1sen!2sbg!4v1755696992586!5m2!1sen!2sbg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Contacts;
