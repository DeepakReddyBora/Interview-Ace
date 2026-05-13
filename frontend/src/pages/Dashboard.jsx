import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

import InterviewHistory from "../components/InterviewHistory.jsx";

import Analytics from "../components/Analytics.jsx";

import useTheme from "../context/useTheme.js";

const Dashboard = () => {

  const navigate = useNavigate();

  const { darkMode } = useTheme();

  const [interviews, setInterviews] =
    useState([]);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );


  // Fetch Interviews
  useEffect(() => {

    const fetchInterviews =
      async () => {

        try {

          const config = {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`,
            },
          };

          const response =
            await axios.get(
              "https://interview-ace-backend-ed6s.onrender.com/api/interview",
              config
            );

          setInterviews(
            response.data
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchInterviews();

  }, [userInfo.token]);


  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >

      {/* Navbar */}

      <Navbar />


      {/* Main Container */}

      <div className="max-w-7xl mx-auto p-8">

        {/* Hero Section */}

        <div className="mb-14">

          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">

            Welcome back,
            <span className="text-blue-500">
              {" "} {userInfo?.name}
            </span>

          </h1>

          <p
            className={`text-lg max-w-3xl ${
              darkMode
                ? "text-slate-400"
                : "text-slate-600"
            }`}
          >
            Practice AI-powered interviews,
            analyze your resume, improve
            your ATS score, and prepare
            smarter with intelligent
            AI-driven feedback.
          </p>

        </div>


        {/* Feature Cards */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

          {/* Technical */}

          <div
            className={`rounded-3xl p-8 border transition-all duration-300 hover:scale-[1.02] ${
              darkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >

            <div className="text-4xl mb-4">
              💻
            </div>

            <h2 className="text-2xl font-semibold mb-4">
              Technical Interviews
            </h2>

            <p
              className={
                darkMode
                  ? "text-slate-400"
                  : "text-slate-600"
              }
            >
              Practice frontend, backend,
              DSA, and system design
              interviews with AI-generated
              questions.
            </p>

          </div>


          {/* HR */}

          <div
            className={`rounded-3xl p-8 border transition-all duration-300 hover:scale-[1.02] ${
              darkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >

            <div className="text-4xl mb-4">
              🎯
            </div>

            <h2 className="text-2xl font-semibold mb-4">
              HR & Behavioral
            </h2>

            <p
              className={
                darkMode
                  ? "text-slate-400"
                  : "text-slate-600"
              }
            >
              Improve communication,
              confidence, and behavioral
              interview performance.
            </p>

          </div>


          {/* AI Evaluation */}

          <div
            className={`rounded-3xl p-8 border transition-all duration-300 hover:scale-[1.02] ${
              darkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >

            <div className="text-4xl mb-4">
              🤖
            </div>

            <h2 className="text-2xl font-semibold mb-4">
              AI Evaluation
            </h2>

            <p
              className={
                darkMode
                  ? "text-slate-400"
                  : "text-slate-600"
              }
            >
              Receive intelligent scoring,
              strengths, weaknesses, and
              personalized improvement
              suggestions.
            </p>

          </div>


          {/* Resume Matching */}

          <div
            className={`rounded-3xl p-8 border transition-all duration-300 hover:scale-[1.02] ${
              darkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >

            <div className="text-4xl mb-4">
              📄
            </div>

            <h2 className="text-2xl font-semibold mb-4">
              Resume Matching
            </h2>

            <p
              className={
                darkMode
                  ? "text-slate-400"
                  : "text-slate-600"
              }
            >
              Match your resume against
              job descriptions and get
              ATS-style AI hiring feedback.
            </p>

            <button
              onClick={() =>
                navigate(
                  "/resume-matcher"
                )
              }
              className="mt-6 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-white font-medium transition-all"
            >
              Try Now
            </button>

          </div>

        </div>


        {/* AI Interview CTA */}

        <div
          className={`mt-12 rounded-3xl p-10 border ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-3">
                Start an AI Interview Session
              </h2>

              <p
                className={
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-600"
                }
              >
                Generate role-specific mock
                interview questions and get
                evaluated instantly by AI.
              </p>

            </div>


            <button
              onClick={() =>
                navigate("/interview/setup")
              }
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-lg font-semibold transition-all text-white shadow-lg"
            >
              Start Interview
            </button>

          </div>

        </div>


        {/* Resume Analyzer CTA */}

        <div
          className={`mt-12 rounded-3xl p-10 border ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-3">
                AI Resume Analyzer
              </h2>

              <p
                className={
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-600"
                }
              >
                Upload your resume and get
                ATS-style scoring, missing
                skills analysis, and
                improvement recommendations.
              </p>

            </div>


            <button
              onClick={() =>
                navigate("/resume-analyzer")
              }
              className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-2xl text-lg font-semibold transition-all text-white shadow-lg"
            >
              Analyze Resume
            </button>

          </div>

        </div>


        {/* Analytics */}

        <Analytics
          interviews={interviews}
        />


        {/* Interview History */}

        <InterviewHistory />

      </div>

    </div>
  );
};

export default Dashboard;