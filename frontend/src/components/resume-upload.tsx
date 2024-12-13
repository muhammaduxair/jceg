"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Upload Your Resume</h2>
      <Card className="bg-zinc-800 border-zinc-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-36 md:h-48 border-2 border-zinc-600 border-dashed rounded-lg cursor-pointer bg-zinc-700 hover:bg-zinc-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-zinc-100" />
                <p className="mb-2 text-sm text-zinc-100">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-zinc-100">
                  PDF, DOCX, TXT, CSV (max. size: 2MB)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.docx,.txt,.csv"
              />
            </label>
          </div>
          {file && (
            <div className="mt-4">
              <p className="text-sm text-zinc-100">
                Selected file: {file.name}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
