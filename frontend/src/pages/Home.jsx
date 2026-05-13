import { Link } from "react-router-dom";

import useTheme from "../context/useTheme.js";

const Home = () => {

  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode
        ? "bg-slate-950 text-white"
        : "bg-white text-slate-900"
    }`}>

      {/* Navbar */}

      <nav className={`flex items-center justify-between px-8 py-6 border-b ${
        darkMode
          ? "border-slate-800"
          : "border-slate-200"
      }`}>

        <h1 className="text-3xl font-bold">
          Interview Ace
        </h1>

        <div className="flex items-center gap-4">

          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-xl transition-all ${
              darkMode
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-slate-200 hover:bg-slate-300"
            }`}
          >
            {darkMode ? "Light" : "Dark"}
          </button>

          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl text-white transition-all"
          >
            Login
          </Link>

        </div>

      </nav>


      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div>

            <p className="text-blue-500 font-semibold mb-4">
              AI-Powered Interview Preparation
            </p>

            <h1 className="text-6xl font-bold leading-tight mb-6">

              Ace Your Next
              <span className="text-blue-500">
                {" "}Tech Interview
              </span>

            </h1>

            <p className={`text-lg mb-8 ${
              darkMode
                ? "text-slate-400"
                : "text-slate-600"
            }`}>

              Practice technical and HR interviews with
              real-time AI feedback, analytics,
              and personalized improvement suggestions.

            </p>

            <div className="flex gap-4">

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-lg font-semibold text-white transition-all"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className={`px-8 py-4 rounded-2xl text-lg font-semibold transition-all ${
                  darkMode
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
              >
                Login
              </Link>

            </div>

          </div>


          {/* Right */}

          <div className={`rounded-3xl p-8 border ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-slate-100 border-slate-200"
          }`}>

            <div className="space-y-6">

              <div className={`p-5 rounded-2xl ${
                darkMode
                  ? "bg-slate-800"
                  : "bg-white"
              }`}>

                <h3 className="text-xl font-semibold mb-2">
                  AI Interview Feedback
                </h3>

                <p className={
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-600"
                }>
                  Get instant strengths and weaknesses analysis.
                </p>

              </div>


              <div className={`p-5 rounded-2xl ${
                darkMode
                  ? "bg-slate-800"
                  : "bg-white"
              }`}>

                <h3 className="text-xl font-semibold mb-2">
                  Real Mock Interviews
                </h3>

                <p className={
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-600"
                }>
                  Simulate actual company interview environments.
                </p>

              </div>


              <div className={`p-5 rounded-2xl ${
                darkMode
                  ? "bg-slate-800"
                  : "bg-white"
              }`}>

                <h3 className="text-xl font-semibold mb-2">
                  Analytics Dashboard
                </h3>

                <p className={
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-600"
                }>
                  Track scores, progress, and interview performance.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;