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

  const [avatarColor, setAvatarColor] =
    useState("bg-blue-600");

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


  const avatarColors = [
    "bg-blue-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-green-600",
    "bg-orange-600",
  ];


  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode
        ? "bg-slate-950 text-white"
        : "bg-slate-100 text-slate-900"
    }`}>

      <Navbar />

      <div className="max-w-4xl mx-auto p-8">

        <div className={`rounded-3xl p-10 border shadow-xl ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200"
        }`}>

          {/* Header */}

          <div className="flex flex-col items-center mb-10">

            {/* Avatar */}

            <div className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold text-white mb-5 ${avatarColor}`}>

              {formData.name
                ?.charAt(0)
                ?.toUpperCase()}

            </div>


            {/* Avatar Colors */}

            <div className="flex gap-3 mb-6">

              {avatarColors.map(
                (
                  color,
                  index
                ) => (

                  <button
                    key={index}
                    onClick={() =>
                      setAvatarColor(
                        color
                      )
                    }
                    className={`w-8 h-8 rounded-full ${color} border-2 border-white`}
                  />
                )
              )}

            </div>


            <h1 className="text-5xl font-bold mb-2">

              My Profile

            </h1>

            <p className={`text-lg ${
              darkMode
                ? "text-slate-400"
                : "text-slate-600"
            }`}>

              Manage your account settings

            </p>

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


          {/* VIEW MODE */}

          {!editing ? (

            <div className="space-y-6">

              <div className={`p-5 rounded-2xl ${
                darkMode
                  ? "bg-slate-800"
                  : "bg-slate-100"
              }`}>

                <p className="text-sm mb-2 text-slate-400">

                  Name

                </p>

                <h2 className="text-2xl font-semibold">

                  {formData.name}

                </h2>

              </div>


              <div className={`p-5 rounded-2xl ${
                darkMode
                  ? "bg-slate-800"
                  : "bg-slate-100"
              }`}>

                <p className="text-sm mb-2 text-slate-400">

                  Email

                </p>

                <h2 className="text-2xl font-semibold">

                  {formData.email}

                </h2>

              </div>


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


              <div className="flex gap-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-4 rounded-xl font-semibold transition-all"
                >

                  {loading
                    ? "Updating..."
                    : "Save Changes"}

                </button>


                <button
                  type="button"
                  onClick={() =>
                    setEditing(
                      false
                    )
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