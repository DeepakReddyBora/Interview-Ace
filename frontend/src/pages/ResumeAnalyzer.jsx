import { useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar.jsx";

import useTheme from "../context/useTheme.js";

const ResumeAnalyzer = () => {

  const { darkMode } = useTheme();

  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState("");

  const [error, setError] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!resume) {

      return setError(
        "Please upload a resume"
      );
    }

    try {

      setLoading(true);

      setError("");

      const formData = new FormData();

      formData.append("resume", resume);

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type":
            "multipart/form-data",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/resume/analyze",
        formData,
        config
      );

      setFeedback(response.data.feedback);

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
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

      <Navbar />


      <div className="max-w-5xl mx-auto p-8">

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold mb-4">
            AI Resume Analyzer
          </h1>

          <p className={`text-lg ${
            darkMode
              ? "text-slate-400"
              : "text-slate-600"
          }`}>
            Upload your resume and receive
            ATS-style AI feedback instantly.
          </p>

        </div>


        {/* Upload Card */}

        <div className={`p-10 rounded-3xl border mb-10 ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="block mb-3 text-lg font-medium">
                Upload Resume (PDF)
              </label>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setResume(e.target.files[0])
                }
                className={`w-full p-4 rounded-2xl border cursor-pointer ${
                  darkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-slate-100 border-slate-300"
                }`}
              />

            </div>


            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-xl">
                {error}
              </div>
            )}


            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-lg font-semibold transition-all text-white disabled:opacity-50"
            >

              {loading
                ? "Analyzing Resume..."
                : "Analyze Resume"}

            </button>

          </form>

        </div>


        {/* Feedback */}

        {feedback && (

          <div className={`p-10 rounded-3xl border ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}>

            <h2 className="text-3xl font-bold mb-6">
              AI Resume Feedback
            </h2>

            <pre className="whitespace-pre-wrap font-sans leading-relaxed text-lg">

              {feedback}

            </pre>

          </div>
        )}

      </div>

    </div>
  );
};

export default ResumeAnalyzer;