"use client";

import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function JobDescription() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
      <div className="space-y-2">
        <Label htmlFor="job-description">Paste the job description here</Label>
        <Textarea
          id="job-description"
          placeholder="Enter the job description..."
          className="h-40 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-300 placeholder:text-zinc-300"
        />
      </div>
    </motion.div>
  );
}
