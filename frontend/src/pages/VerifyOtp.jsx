import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

import useTheme from "../context/useTheme.js";

const VerifyOtp = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const { darkMode } =
    useTheme();

  const email =
    location.state?.email || "";

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [resendLoading,
    setResendLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [timer, setTimer] =
    useState(60);


  // Countdown Timer
  useEffect(() => {

    if (timer <= 0) return;

    const interval =
      setInterval(() => {

        setTimer(
          (prev) => prev - 1
        );

      }, 1000);

    return () =>
      clearInterval(interval);

  }, [timer]);


  // Verify OTP
  const handleVerify =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        setError("");

        setSuccess("");

        const response =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
            {
              email,
              otp,
            }
          );

        setSuccess(
          response.data.message
        );

        setTimeout(() => {

          navigate("/login");

        }, 1500);

      } catch (error) {

        setError(
          error.response?.data
            ?.message ||
          "Verification failed"
        );

      } finally {

        setLoading(false);
      }
    };


  // Resend OTP
  const handleResend =
    async () => {

      try {

        setResendLoading(true);

        setError("");

        setSuccess("");

        const response =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/resend-otp`,
            {
              email,
            }
          );

        setSuccess(
          response.data.message
        );

        setTimer(60);

      } catch (error) {

        setError(
          error.response?.data
            ?.message ||
          "Resend failed"
        );

      } finally {

        setResendLoading(false);
      }
    };


  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode
        ? "bg-slate-950 text-white"
        : "bg-slate-100 text-slate-900"
    }`}>

      <Navbar />


      <div className="flex items-center justify-center px-4 py-20">

        <div className={`w-full max-w-md rounded-3xl p-8 border shadow-2xl ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          {/* Header */}

          <div className="text-center mb-8">

            <div className="text-6xl mb-4">

              📩

            </div>

            <h1 className="text-4xl font-bold mb-3">

              Verify OTP

            </h1>

            <p className={`${
              darkMode
                ? "text-slate-400"
                : "text-slate-600"
            }`}>

              Enter the OTP sent to

            </p>

            <p className="text-blue-500 mt-1 font-medium break-all">

              {email}

            </p>

          </div>


          {/* Success */}

          {success && (

            <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-xl mb-5">

              {success}

            </div>
          )}


          {/* Error */}

          {error && (

            <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-xl mb-5">

              {error}

            </div>
          )}


          {/* Form */}

          <form
            onSubmit={
              handleVerify
            }
            className="space-y-6"
          >

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value
                )
              }
              maxLength={6}
              required
              className={`w-full p-4 rounded-2xl border text-center text-2xl tracking-[10px] outline-none ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-slate-100 border-slate-300"
              }`}
            />


            {/* Verify Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 p-4 rounded-2xl font-semibold text-white transition-all"
            >

              {loading
                ? "Verifying..."
                : "Verify OTP"}

            </button>

          </form>


          {/* Resend */}

          <div className="text-center mt-6">

            {timer > 0 ? (

              <p className={`${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-600"
              }`}>

                Resend OTP in {" "}
                <span className="text-blue-500 font-semibold">

                  {timer}s

                </span>

              </p>

            ) : (

              <button
                onClick={
                  handleResend
                }
                disabled={
                  resendLoading
                }
                className="text-blue-500 hover:text-blue-400 font-semibold transition-all"
              >

                {resendLoading
                  ? "Sending..."
                  : "Resend OTP"}

              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default VerifyOtp;