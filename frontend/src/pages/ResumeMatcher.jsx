import {
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar.jsx";

import useTheme from "../context/useTheme.js";

const ResumeMatcher = () => {

  const { darkMode } =
    useTheme();

  const [resume, setResume] =
    useState(null);

  const [
    jobDescription,
    setJobDescription,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [feedback, setFeedback] =
    useState(null);

  const [error, setError] =
    useState("");


  // Submit Handler
  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        setError("");

        setFeedback(null);

        const formData =
          new FormData();

        formData.append(
          "resume",
          resume
        );

        formData.append(
          "jobDescription",
          jobDescription
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
            "https://interview-ace-backend-ed6s.onrender.com/api/resume/match",
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
          "Resume matching failed"
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

      <div className="max-w-6xl mx-auto p-8">

        {/* Header */}

        <div className="mb-12">

          <h1 className="text-5xl font-bold mb-4">

            AI Resume Job Matcher

          </h1>

          <p className={`text-lg max-w-3xl ${
            darkMode
              ? "text-slate-400"
              : "text-slate-600"
          }`}>

            Compare your resume with a
            job description and receive
            intelligent ATS-style AI
            hiring feedback instantly.

          </p>

        </div>


        {/* Form */}

        <form
          onSubmit={submitHandler}
          className={`p-8 rounded-3xl border ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          {/* Resume Upload */}

          <div className="mb-8">

            <label className="block mb-3 text-lg font-medium">

              Upload Resume (PDF)

            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setResume(
                  e.target.files[0]
                )
              }
              className={`w-full p-4 rounded-2xl border ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-slate-100 border-slate-300"
              }`}
              required
            />

          </div>


          {/* Job Description */}

          <div className="mb-8">

            <label className="block mb-3 text-lg font-medium">

              Job Description

            </label>

            <textarea
              rows="10"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(
                  e.target.value
                )
              }
              className={`w-full p-5 rounded-2xl border outline-none resize-none ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-white placeholder-slate-400"
                  : "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500"
              }`}
              required
            />

          </div>


          {/* Error */}

          {error && (

            <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-xl mb-6">

              {error}

            </div>
          )}


          {/* Submit Button */}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-lg font-semibold transition-all text-white disabled:opacity-50"
          >

            {loading
              ? "Matching Resume..."
              : "Match Resume"}

          </button>

        </form>


        {/* ATS Feedback */}

        {feedback && (

          <div className={`mt-12 p-8 rounded-3xl border ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}>

            <h2 className="text-4xl font-bold mb-10">

              ATS Match Report

            </h2>


            <div className="space-y-10">

              {/* Match Score */}

              <div className="bg-blue-600 p-8 rounded-3xl text-white">

                <h3 className="text-2xl mb-3">
                  ATS Match Score
                </h3>

                <p className="text-6xl font-bold">
                  {feedback.matchScore}%
                </p>

              </div>


              {/* Summary */}

              <div>

                <h3 className="text-3xl font-bold mb-4">
                  Summary
                </h3>

                <p className="text-lg leading-relaxed">

                  {feedback.summary}

                </p>

              </div>


              {/* Strong Skills */}

              <div>

                <h3 className="text-3xl font-bold mb-5">
                  Strong Skills
                </h3>

                <div className="flex flex-wrap gap-4">

                  {feedback.strongSkills?.map(
                    (
                      skill,
                      index
                    ) => (

                      <span
                        key={index}
                        className="bg-green-600 px-5 py-3 rounded-2xl text-white font-medium"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>


              {/* Missing Skills */}

              <div>

                <h3 className="text-3xl font-bold mb-5">
                  Missing Skills
                </h3>

                <div className="flex flex-wrap gap-4">

                  {feedback.missingSkills?.map(
                    (
                      skill,
                      index
                    ) => (

                      <span
                        key={index}
                        className="bg-red-600 px-5 py-3 rounded-2xl text-white font-medium"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>


              {/* Suggestions */}

              <div>

                <h3 className="text-3xl font-bold mb-5">
                  Suggestions
                </h3>

                <ul className="space-y-4">

                  {feedback.suggestions?.map(
                    (
                      suggestion,
                      index
                    ) => (

                      <li
                        key={index}
                        className={`p-5 rounded-2xl leading-relaxed ${
                          darkMode
                            ? "bg-slate-800"
                            : "bg-slate-100"
                        }`}
                      >
                        • {suggestion}
                      </li>
                    )
                  )}

                </ul>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default ResumeMatcher;