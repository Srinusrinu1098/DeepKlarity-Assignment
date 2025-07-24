"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

export default function ResumeDetailPage({ params }) {
  const [resume, setresume] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(resume ? "yes" : "no");
  const param = React.use(params);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resumes/${param.id}`
        );

        setTimeout(setresume(res.data), 2000);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderIcon className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="p-6 text-red-500 text-center">
        Resume not found or failed to load.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto ">
      <div className="bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-8 space-y-6 border  border-black">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 border-b pb-4">
          {resume.name}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base">
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              📧 Email:
            </span>
            <br />
            {resume.email}
          </p>
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              📱 Phone:
            </span>
            <br />
            {resume.phone}
          </p>
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              🔗 LinkedIn:
            </span>
            <br />
            <a
              href={resume.linkedin_url}
              target="_blank"
              className="text-blue-500 underline"
            >
              {resume.linkedin_url}
            </a>
          </p>
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              GitHub:
            </span>
            <br />
            <a
              href={resume.portfolio_url}
              target="_blank"
              className="text-blue-500 underline"
            >
              {resume.portfolio_url}
            </a>
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <div>
            <h2 className="text-lg font-semibold text-indigo-600">
              📝 Summary
            </h2>
            <p className="text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
              {resume.summary}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-indigo-600">
              💻 Technical Skills
            </h2>
            <p className="text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
              {resume.technical_skills}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-indigo-600">
              🤝 Soft Skills
            </h2>
            <p className="text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
              {resume.soft_skills}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-indigo-600">
              ⚠️ Improvement Areas
            </h2>
            <p className="text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
              {resume.improvement_areas}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-indigo-600">
              📚 Upskill Suggestions
            </h2>
            <p className="text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
              {resume.upskill_suggestions}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-indigo-600">
              📎 Original File
            </h2>
            <p className="text-gray-800 dark:text-gray-300">
              {resume.orginal_file_name}
            </p>
          </div>
          <div className="text-end">
            <Link href="/resumes">
              <Button className={"cursor-pointer"}>Back to all resumes</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
