"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";

export default function Navigation() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
        controls.start({ y: 0, opacity: 1 });
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false);
        controls.start({ y: -100, opacity: 0 });
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, controls]);

  return (
    <motion.nav
      id="main-navigation"
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center h-16 py-4 px-6 bg-zinc-800 bg-opacity-90 backdrop-blur-sm"
      initial={{ y: 0, opacity: 1 }}
      animate={controls}
      transition={{ duration: 0.2 }}
    >
      <div className="text-sm text-zinc-300">
        Sign up to save your resume and streamline your job applications
      </div>
      <Button
        variant="outline"
        className="bg-white text-black hover:bg-zinc-200"
        onClick={() => {
          /* Implement Google Sign In logic here */
        }}
      >
        Sign up with Google
      </Button>
    </motion.nav>
  );
}
