"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { IGenerateEmailResponse } from "@/utils";

interface EmailResultsProps {
  data: IGenerateEmailResponse;
}

export default function EmailResults({ data }: EmailResultsProps) {
  const [copied, setCopied] = useState({
    subject: false,
    recipient: false,
    email: false,
  });

  const copyToClipboard = (
    text: string,
    field: "subject" | "recipient" | "email"
  ) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [field]: true });
    setTimeout(() => setCopied({ ...copied, [field]: false }), 2000);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-4" id="generated-email">
        Generated Email
      </h2>
      {data.recipient && (
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl text-white">Recipient</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  copyToClipboard(data?.recipient ?? "", "recipient")
                }
              >
                {copied.recipient ? "Copied!" : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-100">{data.recipient}</p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-white">Subject</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(data.subject, "subject")}
            >
              {copied.subject ? "Copied!" : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-100">{data.subject}</p>
        </CardContent>
      </Card>

      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-white">Email Content</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(data.email, "email")}
            >
              {copied.email ? "Copied!" : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-100 whitespace-pre-wrap">{data.email}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
