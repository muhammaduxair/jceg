"use client";

import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction } from "react";

interface JobDescriptionProps {
  value: string;
  onChange: (value: string) => void;
  setActiveTab: Dispatch<SetStateAction<"paste" | "url">>;
}

export default function JobDescription({
  value,
  onChange,
  setActiveTab,
}: JobDescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Job Description
      </h2>
      <Tabs
        defaultValue="paste"
        onValueChange={(value) => setActiveTab(value as "paste" | "url")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-zinc-800 rounded-md p-1">
          <TabsTrigger
            value="paste"
            className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white text-zinc-400 rounded-sm transition-all"
          >
            Paste Description
          </TabsTrigger>
          <TabsTrigger
            value="url"
            className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white text-zinc-400 rounded-sm transition-all"
          >
            Enter URL
          </TabsTrigger>
        </TabsList>
        <TabsContent value="paste" className="mt-4">
          <div className="space-y-2">
            <Label htmlFor="job-description" className="text-white">
              Paste the job description here
            </Label>
            <Textarea
              id="job-description"
              placeholder="Enter the job description..."
              className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:ring-zinc-600 focus:border-zinc-600"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={10}
            />
          </div>
        </TabsContent>
        <TabsContent value="url" className="mt-4">
          <div className="space-y-2">
            <Label htmlFor="job-url" className="text-white">
              Enter the job posting URL
            </Label>
            <div className="flex space-x-2">
              <Input
                id="job-url"
                type="url"
                placeholder="https://example.com/job-posting"
                className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400 focus:ring-zinc-600 focus:border-zinc-600 flex-grow"
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
