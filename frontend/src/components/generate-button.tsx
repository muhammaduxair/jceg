"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  isGenerating: boolean;
  btnLoadingText: string;
}

export default function GenerateButton({
  onClick,
  isGenerating,
  btnLoadingText,
}: GenerateButtonProps) {
  return (
    <motion.div
      className="flex"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <Button
        onClick={onClick}
        disabled={isGenerating}
        className="bg-white hover:bg-neutral-300 text-zinc-800 font-bold py-2 px-4 rounded-lg text-lg w-full"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {btnLoadingText}
          </>
        ) : (
          "Generate Email"
        )}
      </Button>
    </motion.div>
  );
}
