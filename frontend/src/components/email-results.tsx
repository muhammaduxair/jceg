"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const emailData = {
  subject: "Experienced Web Developer Excited About [Company Name]'s Mission",
  recipient: "hiring.manager@company.com",
  email: `Dear Hiring Manager,

I hope this email finds you well. I recently came across the Web Developer position at [Company Name] and I'm thrilled about the opportunity to contribute to your innovative team.

With my strong background in full-stack development and passion for creating user-centric applications, I believe I would be a valuable addition to your organization. Your company's commitment to [specific aspect of company's mission] aligns perfectly with my professional goals and values.

I'd love the opportunity to discuss how my skills and experience can contribute to [Company Name]'s continued success. Would you be available for a brief call next week to explore this further?

Thank you for your time and consideration. I look forward to the possibility of speaking with you soon.

Best regards,
[Your Name]`,
};

export default function EmailResults() {
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
      <h2 className="text-2xl font-semibold mb-4">Generated Email</h2>
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-white">Recipient</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(emailData.recipient, "recipient")}
            >
              {copied.recipient ? "Copied!" : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-100">{emailData.recipient}</p>
        </CardContent>
      </Card>

      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-white">Subject</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(emailData.subject, "subject")}
            >
              {copied.subject ? "Copied!" : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-100">{emailData.subject}</p>
        </CardContent>
      </Card>

      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-white">Email Content</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(emailData.email, "email")}
            >
              {copied.email ? "Copied!" : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-100 whitespace-pre-wrap">{emailData.email}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
