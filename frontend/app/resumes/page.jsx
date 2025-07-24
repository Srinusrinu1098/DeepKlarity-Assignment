"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ResumeListPage() {
  const [resumes, setresume] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resumes`
        );
        setresume(res.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-neutral-100 via-white to-neutral-200 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        ✨ Previous Resume Analyses
      </h1>
      {resumes.length <= 0 && (
        <div className="flex h-screen flex-col justify-center items-center">
          <p className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
            No previous resumes available
          </p>
          <Link href="/Upload">
            <Button className={"cursor-pointer"}>Enhance Your Resume</Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out p-6 border border-gray-100 dark:border-neutral-700"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-xl text-neutral-800 dark:text-neutral-100 mb-1">
                  {resume.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-neutral-400 mb-2">
                  {resume.email}
                </p>
              </div>
              <div>
                {" "}
                <p className="text-sm text-gray-500 dark:text-neutral-400 mb-2">
                  {resume.orginal_file_name}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 flex justify-between items-center">
              <span>📊 Rating:</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {resume.resume_rating}/10
              </span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <Link href={`/`}>
                <Button className={"mt-3 w-full cursor-pointer"}>
                  Go back to Home
                </Button>
              </Link>
              <Link href={`/resumes/${resume.id}`}>
                <Button className={"mt-3 w-full cursor-pointer"}>
                  Resume Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
