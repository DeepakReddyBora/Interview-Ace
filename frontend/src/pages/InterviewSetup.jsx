import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

import useTheme from "../context/useTheme.js";

import { generateInterview } from "../services/interviewService.js";

const InterviewSetup = () => {

  const navigate = useNavigate();

  const { darkMode } = useTheme();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    role: "",
    level: "",
    type: "",
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      const data = await generateInterview(
        formData
      );

      navigate(`/interview/${data.interview._id}`);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to generate interview"
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


      {/* Main Content */}

      <div className="max-w-2xl mx-auto p-8">

        <div className={`p-8 rounded-3xl border shadow-2xl ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          {/* Heading */}

          <h1 className="text-4xl font-bold mb-3">
            Setup Interview
          </h1>

          <p className={`mb-8 text-lg ${
            darkMode
              ? "text-slate-400"
              : "text-slate-600"
          }`}>
            Configure your AI interview session.
          </p>


          {/* Error */}

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-xl mb-6">
              {error}
            </div>
          )}


          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Role */}

            <div>

              <label className="block mb-2 font-medium">
                Job Role
              </label>

              <input
                type="text"
                name="role"
                placeholder="Frontend Developer"
                value={formData.role}
                onChange={handleChange}
                className={`w-full p-4 rounded-xl border outline-none transition-all ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500"
                    : "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500"
                }`}
              />

            </div>


            {/* Level */}

            <div>

              <label className="block mb-2 font-medium">
                Experience Level
              </label>

              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className={`w-full p-4 rounded-xl border outline-none transition-all ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white focus:border-blue-500"
                    : "bg-slate-100 border-slate-300 text-slate-900 focus:border-blue-500"
                }`}
              >

                <option value="">
                  Select Level
                </option>

                <option value="Fresher">
                  Fresher
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Experienced">
                  Experienced
                </option>

              </select>

            </div>


            {/* Type */}

            <div>

              <label className="block mb-2 font-medium">
                Interview Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full p-4 rounded-xl border outline-none transition-all ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white focus:border-blue-500"
                    : "bg-slate-100 border-slate-300 text-slate-900 focus:border-blue-500"
                }`}
              >

                <option value="">
                  Select Type
                </option>

                <option value="Technical">
                  Technical
                </option>

                <option value="HR">
                  HR
                </option>

                <option value="Behavioral">
                  Behavioral
                </option>

              </select>

            </div>


            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {loading
                ? "Generating..."
                : "Generate Interview"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default InterviewSetup;