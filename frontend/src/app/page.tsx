import Hero from "@/components/hero";
import ResumeUpload from "@/components/resume-upload";
import JobDescription from "@/components/job-description";
import GenerateButton from "@/components/generate-button";
import EmailResults from "@/components/email-results";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-white">
      <div className="px-4">
        <Hero />
      </div>
      <div className="container mx-auto px-4 py-8 space-y-8 md:py-12 md:space-y-12 max-w-4xl">
        <ResumeUpload />
        <JobDescription />
        <GenerateButton />
        <EmailResults />
      </div>
    </main>
  );
}
