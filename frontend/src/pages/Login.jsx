import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../services/authService.js";

import useTheme from "../context/useTheme.js";

const Login = () => {

  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {

      const data = await loginUser(formData);

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      setSuccess("Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {

      setError(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };


  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-all duration-300 ${
      darkMode
        ? "bg-slate-950 text-white"
        : "bg-slate-100 text-slate-900"
    }`}>

      {/* Theme Toggle */}

      <button
        onClick={toggleTheme}
        className={`absolute top-6 right-6 px-4 py-2 rounded-xl transition-all ${
          darkMode
            ? "bg-slate-800 hover:bg-slate-700"
            : "bg-white hover:bg-slate-200"
        }`}
      >
        {darkMode ? "Light" : "Dark"}
      </button>


      {/* Login Card */}

      <div className={`w-full max-w-md rounded-3xl p-8 border shadow-2xl transition-all ${
        darkMode
          ? "bg-slate-900 border-slate-800"
          : "bg-white border-slate-200"
      }`}>

        <h1 className="text-4xl font-bold text-center mb-2">
          Interview Ace
        </h1>

        <p className={`text-center mb-8 ${
          darkMode
            ? "text-slate-400"
            : "text-slate-600"
        }`}>
          AI Powered Interview Preparation
        </p>


        {/* Success Message */}

        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-400 p-3 rounded-xl mb-4">
            {success}
          </div>
        )}


        {/* Error Message */}

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-xl mb-4">
            {error}
          </div>
        )}


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-4 rounded-xl border outline-none transition-all ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500"
                : "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500"
            }`}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-4 rounded-xl border outline-none transition-all ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500"
                : "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500"
            }`}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-xl font-semibold text-white"
          >
            Login
          </button>

        </form>


        {/* Footer */}

        <p className={`text-center mt-6 ${
          darkMode
            ? "text-slate-400"
            : "text-slate-600"
        }`}>

          Don’t have an account?

          <Link
            to="/register"
            className="text-blue-500 ml-2 font-medium"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;