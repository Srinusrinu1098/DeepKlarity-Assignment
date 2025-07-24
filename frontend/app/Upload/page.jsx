"use client";
import React, { useState } from "react";
import axios from "axios";
import { FileUpload } from "@/components/ui/file-upload";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Headers from "../Header/Headers";

export default function FileUploadDemo() {
  const [files, setFiles] = useState([]);
  const [aiResponse, setAiResponse] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleFileUpload = async (uploadedFiles) => {
    setFiles(uploadedFiles);

    const formData = new FormData();
    formData.append("resume", uploadedFiles[0]);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/resume/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAiResponse(res.data);
      setOpen(true);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const gobackHome = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <div>
      <Headers />
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <FileUpload onChange={handleFileUpload} open={open} />

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger className="hidden">Open</AlertDialogTrigger>
          <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto ">
            {/* ❌ Button to close the dialog */}
            <AlertDialogCancel asChild>
              <h1
                onClick={() => gobackHome()}
                className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-red-600 text-xl font-bold"
              >
                ×
              </h1>
            </AlertDialogCancel>

            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold">
                Resume Analysis for{" "}
                <span className="text-primary">{aiResponse?.data.name}</span>
              </AlertDialogTitle>

              <AlertDialogDescription asChild>
                <div className="space-y-4 text-left text-sm pt-2">
                  {/* 📌 Basic Info */}
                  <div>
                    <h2 className="font-semibold text-base mb-1">
                      📌 Basic Info
                    </h2>
                    <p>
                      <strong>Email:</strong> {aiResponse?.data.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {aiResponse?.data.phone}
                    </p>
                    <p>
                      <strong>LinkedIn:</strong>{" "}
                      <a
                        href={aiResponse?.data.linkedin_url}
                        target="_blank"
                        className="text-blue-500 underline"
                      >
                        {aiResponse?.data.linkedin_url}
                      </a>
                    </p>
                    <p>
                      <strong>Portfolio:</strong>{" "}
                      <a
                        href={aiResponse?.data.portfolio_url}
                        target="_blank"
                        className="text-blue-500 underline"
                      >
                        {aiResponse?.data.portfolio_url}
                      </a>
                    </p>
                    <p>
                      <strong>Resume File:</strong> {aiResponse?.fileName}
                    </p>
                  </div>

                  {/* 💡 Summary */}
                  {aiResponse?.data.summary && (
                    <div>
                      <h3 className="font-semibold text-base mb-1">
                        💡 Summary
                      </h3>
                      <p>{aiResponse?.data.summary}</p>
                    </div>
                  )}

                  {/* 🧑‍💼 Work Experience */}
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      🧑‍💼 Work Experience
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {aiResponse?.data.work_experience?.map((exp, i) => (
                        <li key={i}>
                          <p className="font-semibold">
                            {exp.role} @ {exp.company} ({exp.duration})
                          </p>
                          <ul className="list-disc list-inside ml-4 text-gray-600">
                            {exp.description.map((line, j) => (
                              <li key={j}>{line}</li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 🎓 Education */}
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      🎓 Education
                    </h3>
                    <ul className="list-disc list-inside">
                      {aiResponse?.data.education.map((edu, i) => (
                        <li key={i}>
                          {edu.degree}, {edu.institution} ({edu.graduation_year}
                          )
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 💻 Technical Skills */}
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      💻 Technical Skills
                    </h3>
                    <p className="text-gray-700">
                      {aiResponse?.data.technical_skills.join(", ")}
                    </p>
                  </div>

                  {/* 💬 Soft Skills */}
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      💬 Soft Skills
                    </h3>
                    <p className="text-gray-700">
                      {aiResponse?.data.soft_skills.join(", ")}
                    </p>
                  </div>

                  {/* ⭐ Resume Rating */}
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      ⭐ Resume Rating
                    </h3>
                    <p className="text-gray-700">
                      {aiResponse?.data.resume_rating} / 10
                    </p>
                  </div>

                  {/* ⚠️ Improvement Areas */}
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      ⚠️ Improvement Areas
                    </h3>
                    <p className="text-red-600">
                      {aiResponse?.data.improvement_areas}
                    </p>
                  </div>

                  {/* 🚀 Upskill Suggestions */}
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      🚀 Upskill Suggestions
                    </h3>
                    <ul className="list-disc list-inside">
                      {aiResponse?.data.upskill_suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
