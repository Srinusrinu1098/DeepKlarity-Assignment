import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Headers from "./Header/Headers";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <Headers />

      <div className="flex flex-col items-center justify-center px-4 py-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 leading-tight">
          Supercharge Your Career with <br />
          <span className="text-blue-600">AI-Powered Resume Insights</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Upload Resume Card */}
          <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-300">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Enhance Your Resume with AI-Driven Feedback
              </h2>
              <p className="text-gray-600 text-sm">
                Our AI-powered Resume Analyzer intelligently reviews your resume
                and provides personalized feedback to help you stand out. It
                evaluates key sections like skills, experience, and formatting,
                and offers actionable suggestions to ensure your resume aligns
                with industry standards.
              </p>
            </div>
            <div className="mt-6 text-center">
              <Link href="/Upload">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                  Upload Resume 🚀
                </Button>
              </Link>
            </div>
          </div>

          {/* View Resumes Card */}
          <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-300">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Your Previous Resume Reviews
              </h2>
              <p className="text-gray-600 text-sm">
                Access your previously uploaded resumes and AI feedback. Analyze
                structure, skills, and optimization potential—track progress,
                compare results, and refine your resume over time with insights
                at your fingertips.
              </p>
            </div>
            <div className="mt-6 text-center">
              <Link href="/resumes">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                  View Resumes 📂
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
