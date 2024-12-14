"use client";

import Hero from "@/components/hero";
import ResumeUpload from "@/components/resume-upload";
import JobDescription from "@/components/job-description";
import GenerateButton from "@/components/generate-button";
import EmailResults from "@/components/email-results";
import { useNavigationHeight } from "@/hooks/use-navigation-height";
import { useCallback, useState } from "react";
import { IGenerateEmailResponse } from "@/utils";
import apiService from "@/utils/api-service";
import toast from "react-hot-toast";

const btnLoadingTexts = [
  "Loading your resume",
  "Reading job description",
  "Please wait, email is generating",
];

export default function Home() {
  const navHeight = useNavigationHeight();

  // ====== State Management ======
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [generatedResponse, setGeneratedResponse] =
    useState<IGenerateEmailResponse>({} as IGenerateEmailResponse);
  const [isGenerating, setIsGenerating] = useState(false);
  const [btnLoadingText, setBtnLoadingText] = useState("");
  // ==============================

  // ====== Callbacks =============
  const handleResumeUpload = useCallback((file: File) => {
    setResume(file);
  }, []);

  const handleJobDescriptionChange = useCallback((description: string) => {
    setJobDescription(description);
  }, []);
  // ==============================

  const handleGenerate = async () => {
    if (!resume || !jobDescription) {
      toast.error("Please upload a resume and enter a job description.");
      return;
    }

    setIsGenerating(true);
    let i = 0;
    const interval = setInterval(() => {
      setBtnLoadingText(btnLoadingTexts[i]);
      i = (i + 1) % btnLoadingTexts.length;
    }, 2000);
    // ====== Your Actual Logic Starts Here ======

    const formData = new FormData();
    formData.append("resume_file", resume as File);
    formData.append("job_description", jobDescription);

    const response = await apiService.post<IGenerateEmailResponse>(
      "agent/generate-email",
      formData,
      {
        uploadingFile: true,
      }
    );

    if (response.isSuccess) {
      setGeneratedResponse(response.data as IGenerateEmailResponse);
      setTimeout(() => {
        document
          .getElementById("generated-email")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      toast.error(
        response?.error ?? "Failed to generate email. Please try again."
      );
    }

    // ====== Your Actual Logic Ends Here ======
    clearInterval(interval);
    setIsGenerating(false);
  };

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-white"
      style={{ paddingTop: `${navHeight}px` }}
    >
      <div className="px-4">
        <Hero />
      </div>
      <div className="container mx-auto px-4 py-8 space-y-8 md:py-12 md:space-y-12 max-w-4xl">
        <ResumeUpload onUpload={handleResumeUpload} />
        <JobDescription
          value={jobDescription}
          onChange={handleJobDescriptionChange}
        />
        <GenerateButton
          onClick={handleGenerate}
          isGenerating={isGenerating}
          btnLoadingText={btnLoadingText}
        />
        {generatedResponse.email && <EmailResults data={generatedResponse} />}
      </div>
    </main>
  );
}
