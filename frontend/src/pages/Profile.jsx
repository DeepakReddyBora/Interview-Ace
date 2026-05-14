import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar.jsx";

import useTheme from "../context/useTheme.js";

const Profile = () => {

  const { darkMode } =
    useTheme();

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });


  const userInfo = JSON.parse(
    localStorage.getItem(
      "userInfo"
    )
  );


  // Fetch Profile
  useEffect(() => {

    const fetchProfile =
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
              `${import.meta.env.VITE_API_URL}/api/auth/profile`,
              config
            );

          setFormData({
            name:
              response.data.name,
            email:
              response.data.email,
            password: "",
          });

        } catch (error) {

          console.log(error);
        }
      };

    fetchProfile();

  }, [userInfo.token]);


  // Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };


  // Submit
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        setError("");

        setSuccess("");

        const config = {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        };

        const response =
          await axios.put(
            `${import.meta.env.VITE_API_URL}/api/auth/profile`,
            formData,
            config
          );

        localStorage.setItem(
          "userInfo",
          JSON.stringify(
            response.data
          )
        );

        setSuccess(
          "Profile updated successfully"
        );

      } catch (error) {

        setError(
          error.response?.data
            ?.message ||
          "Update failed"
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

      <div className="max-w-3xl mx-auto p-8">

        <div className={`rounded-3xl p-10 border ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          {/* Header */}

          <div className="text-center mb-10">

            <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold mx-auto mb-5">

              {formData.name
                ?.charAt(0)
                ?.toUpperCase()}

            </div>

            <h1 className="text-4xl font-bold">

              My Profile

            </h1>

          </div>


          {/* Success */}

          {success && (

            <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-xl mb-6">

              {success}

            </div>
          )}


          {/* Error */}

          {error && (

            <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-xl mb-6">

              {error}

            </div>
          )}


          {/* Form */}

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-6"
          >

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              className={`w-full p-4 rounded-xl border outline-none ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-slate-100 border-slate-300"
              }`}
            />


            <input
              type="email"
              name="email"
              placeholder="Email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              className={`w-full p-4 rounded-xl border outline-none ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-slate-100 border-slate-300"
              }`}
            />


            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              className={`w-full p-4 rounded-xl border outline-none ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-slate-100 border-slate-300"
              }`}
            />


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-4 rounded-xl font-semibold transition-all"
            >

              {loading
                ? "Updating..."
                : "Update Profile"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Profile;