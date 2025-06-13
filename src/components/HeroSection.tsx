// components/HeroSection.jsx
"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "./ui/aurora-background";

export default function HeroSection() {
  return (
    <AuroraBackground>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center justify-center h-[80vh] px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold dark:text-white text-center">
          Minden, ami tech. Egy helyen.
        </h1>
        <p className="mt-4 text-xl font-extralight md:text-2xl dark:text-neutral-200 py-4 text-center">
          Fedezd fel a legújabb okoseszközöket, kütyüket és technológiákat –
          gyors szállítással, kedvező áron.
        </p>
        <a
          href="#products"
          className="mt-8 bg-black dark:bg-white rounded-full w-fit text-white dark:text-black p-4"
        >
          Böngéssz most
        </a>
      </motion.section>
    </AuroraBackground>
  );
}
