import { useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar.jsx";

import useTheme from "../context/useTheme.js";

const ResumeAnalyzer = () => {

  const { darkMode } =
    useTheme();

  const [resume, setResume] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [feedback, setFeedback] =
    useState("");

  const [error, setError] =
    useState("");


  // Submit
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!resume) {

        return setError(
          "Please upload a resume"
        );
      }

      try {

        setLoading(true);

        setError("");

        setFeedback("");

        const formData =
          new FormData();

        formData.append(
          "resume",
          resume
        );

        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        const config = {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
            "Content-Type":
              "multipart/form-data",
          },
        };

        const response =
          await axios.post(
            "https://interview-ace-backend-ed6s.onrender.com/api/resume/analyze",
            formData,
            config
          );

        setFeedback(
          response.data.feedback
        );

      } catch (error) {

        console.log(error);

        setError(
          error.response?.data
            ?.message ||
          "Resume analysis failed"
        );

      } finally {

        setLoading(false);
      }
    };


  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode
        ? "bg-slate-950 text-white"
        : "bg-slate-100 text-slate-900"
    }`}>

      {/* Navbar */}

      <Navbar />


      {/* Main Container */}

      <div className="max-w-6xl mx-auto p-8">

        {/* Header */}

        <div className="mb-12">

          <h1 className="text-5xl font-bold mb-4">

            AI Resume Analyzer

          </h1>

          <p className={`text-lg max-w-3xl ${
            darkMode
              ? "text-slate-400"
              : "text-slate-600"
          }`}>

            Upload your resume and receive
            ATS-style AI feedback,
            missing skills analysis,
            resume improvements, and
            interview readiness insights.

          </p>

        </div>


        {/* Upload Card */}

        <div className={`rounded-3xl p-10 border mb-10 transition-all ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-8"
          >

            {/* Upload Box */}

            <div
              className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all ${
                darkMode
                  ? "border-slate-700 bg-slate-800/50"
                  : "border-slate-300 bg-slate-50"
              }`}
            >

              <div className="text-6xl mb-5">

                📄

              </div>

              <h2 className="text-2xl font-semibold mb-3">

                Upload Your Resume

              </h2>

              <p className={`mb-6 ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-600"
              }`}>

                Upload a PDF resume and
                receive AI-powered ATS
                analysis instantly.

              </p>


              {/* File Input */}

              <input
                type="file"
                accept=".pdf"
                id="resumeUpload"
                className="hidden"
                onChange={(e) =>
                  setResume(
                    e.target.files[0]
                  )
                }
              />


              <label
                htmlFor="resumeUpload"
                className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-white font-semibold cursor-pointer transition-all"
              >

                Choose Resume

              </label>


              {/* File Name */}

              {resume && (

                <div className={`mt-6 p-4 rounded-2xl ${
                  darkMode
                    ? "bg-slate-800"
                    : "bg-slate-100"
                }`}>

                  <p className="font-medium">

                    Selected File:

                  </p>

                  <p className="mt-1 text-blue-500 break-all">

                    {resume.name}

                  </p>

                </div>
              )}

            </div>


            {/* Error */}

            {error && (

              <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-2xl">

                {error}

              </div>
            )}


            {/* Submit Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed p-5 rounded-2xl text-xl font-semibold text-white transition-all"
            >

              {loading
                ? "Analyzing Resume..."
                : "Analyze Resume"}

            </button>

          </form>

        </div>


        {/* Feedback Section */}

        {feedback && (

          <div className={`rounded-3xl p-10 border transition-all ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}>

            <div className="flex items-center gap-4 mb-8">

              <div className="text-5xl">

                🤖

              </div>

              <div>

                <h2 className="text-4xl font-bold">

                  AI Resume Feedback

                </h2>

                <p className={`mt-2 ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-600"
                }`}>

                  ATS analysis and
                  improvement suggestions

                </p>

              </div>

            </div>


            {/* Feedback Content */}

            <div className={`rounded-3xl p-8 overflow-x-auto ${
              darkMode
                ? "bg-slate-800"
                : "bg-slate-100"
            }`}>

              <pre className="whitespace-pre-wrap font-sans leading-relaxed text-lg">

                {feedback}

              </pre>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default ResumeAnalyzer;