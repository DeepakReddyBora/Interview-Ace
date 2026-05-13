import { useNavigate } from "react-router-dom";

import useTheme from "../context/useTheme.js";

const Navbar = () => {

  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useTheme();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {

    localStorage.removeItem("userInfo");

    navigate("/login");
  };

  return (
    <nav className={`flex items-center justify-between px-8 py-5 border-b transition-all ${
      darkMode
        ? "bg-slate-900 border-slate-800 text-white"
        : "bg-white border-slate-200 text-slate-900"
    }`}>

      {/* Logo */}

      <h1 className="text-3xl font-bold">
        Interview Ace
      </h1>


      {/* Right Side */}

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


        <div className={`px-4 py-2 rounded-xl ${
          darkMode
            ? "bg-slate-800"
            : "bg-slate-100"
        }`}>

          {userInfo?.name}

        </div>


        <button
          onClick={logoutHandler}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl text-white transition-all"
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;