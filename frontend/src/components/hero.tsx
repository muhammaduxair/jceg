"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      className="py-12 md:py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">
        AI Job Cold Email Generator
      </h1>
      <p className="md:text-lg lg:text-xl  max-w-3xl mx-auto">
        Craft personalized, compelling cold emails for your dream job in
        seconds. Increase your chances of landing interviews with AI-powered
        email generation.
      </p>
    </motion.section>
  );
}
