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

  const [editing, setEditing] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [avatar, setAvatar] =
    useState(null);

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


  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };


  // Handle Avatar Upload
  const handleAvatarChange = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (file) {

      const imageUrl =
        URL.createObjectURL(
          file
        );

      setAvatar(imageUrl);
    }
  };


  // Update Profile
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

        setEditing(false);

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

      {/* Navbar */}

      <Navbar />


      {/* Main Content */}

      <div className="max-w-4xl mx-auto p-8">

        <div className={`rounded-3xl p-10 border shadow-xl ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          {/* Header */}

          <div className="flex flex-col items-center mb-12">

            {/* Avatar */}

            <div className="relative">

              {avatar ? (

                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
                />

              ) : (

                <div className="w-36 h-36 rounded-full bg-blue-600 flex items-center justify-center text-6xl font-bold text-white">

                  {formData.name
                    ?.charAt(0)
                    ?.toUpperCase()}

                </div>
              )}


              {/* Upload Avatar */}

              <label className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer text-white text-xl shadow-lg transition-all">

                +

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={
                    handleAvatarChange
                  }
                />

              </label>

            </div>


            {/* User Info */}

            <h1 className="text-5xl font-bold mt-6 mb-2">

              {formData.name}

            </h1>

            <p className={`text-lg ${
              darkMode
                ? "text-slate-400"
                : "text-slate-600"
            }`}>

              {formData.email}

            </p>

          </div>


          {/* Success Message */}

          {success && (

            <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-xl mb-6">

              {success}

            </div>
          )}


          {/* Error Message */}

          {error && (

            <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-xl mb-6">

              {error}

            </div>
          )}


          {/* VIEW MODE */}

          {!editing ? (

            <div className="space-y-6">

              {/* Name Card */}

              <div className={`p-6 rounded-2xl ${
                darkMode
                  ? "bg-slate-800"
                  : "bg-slate-100"
              }`}>

                <p className="text-sm text-slate-400 mb-2">

                  Full Name

                </p>

                <h2 className="text-2xl font-semibold">

                  {formData.name}

                </h2>

              </div>


              {/* Email Card */}

              <div className={`p-6 rounded-2xl ${
                darkMode
                  ? "bg-slate-800"
                  : "bg-slate-100"
              }`}>

                <p className="text-sm text-slate-400 mb-2">

                  Email Address

                </p>

                <h2 className="text-2xl font-semibold">

                  {formData.email}

                </h2>

              </div>


              {/* Status Card */}

              <div className={`p-6 rounded-2xl ${
                darkMode
                  ? "bg-slate-800"
                  : "bg-slate-100"
              }`}>

                <p className="text-sm text-slate-400 mb-2">

                  Account Status

                </p>

                <h2 className="text-2xl font-semibold text-green-500">

                  Active

                </h2>

              </div>


              {/* Edit Button */}

              <button
                onClick={() =>
                  setEditing(true)
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold transition-all"
              >

                Edit Profile

              </button>

            </div>

          ) : (

            /* EDIT MODE */

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-6"
            >

              {/* Name */}

              <input
                type="text"
                name="name"
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


              {/* Email */}

              <input
                type="email"
                name="email"
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


              {/* Password */}

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


              {/* Buttons */}

              <div className="flex gap-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-4 rounded-xl font-semibold transition-all"
                >

                  {loading
                    ? "Saving..."
                    : "Save Changes"}

                </button>


                <button
                  type="button"
                  onClick={() =>
                    setEditing(false)
                  }
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white p-4 rounded-xl font-semibold transition-all"
                >

                  Cancel

                </button>

              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};

export default Profile;