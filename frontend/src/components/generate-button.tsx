"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const loadingTexts = [
  "Generating email",
  "Loading your resume",
  "Reading job description",
  "Please wait, email is generating",
];

export default function GenerateButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const handleGenerate = () => {
    setIsLoading(true);
    let i = 0;
    const interval = setInterval(() => {
      setLoadingText(loadingTexts[i]);
      i = (i + 1) % loadingTexts.length;
    }, 2000);

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
    }, 8000);
  };

  return (
    <motion.div
      className="flex"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <Button
        onClick={handleGenerate}
        disabled={isLoading}
        className="bg-white hover:bg-neutral-300 text-zinc-800 font-bold py-2 px-4 rounded-lg text-lg w-full"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          "Generate Email"
        )}
      </Button>
    </motion.div>
  );
}
