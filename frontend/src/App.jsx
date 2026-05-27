import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home.jsx";

import Login from "./pages/Login.jsx";

import Register from "./pages/Register.jsx";

import Dashboard from "./pages/Dashboard.jsx";

import InterviewSetup from "./pages/InterviewSetup.jsx";

import InterviewPage from "./pages/InterviewPage.jsx";

import ResumeAnalyzer from "./pages/ResumeAnalyzer.jsx";

import ResumeMatcher from "./pages/ResumeMatcher.jsx";

import Profile from "./pages/Profile.jsx";

import ProtectedRoute from "./routes/protectedRoute.jsx";

const App = () => {

  return (
    <Routes>

      {/* ================= HOME ================= */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* ================= AUTH ================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ================= DASHBOARD ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>
        }
      />


      {/* ================= PROFILE ================= */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>

            <Profile />

          </ProtectedRoute>
        }
      />


      {/* ================= RESUME ANALYZER ================= */}

      <Route
        path="/resume-analyzer"
        element={
          <ProtectedRoute>

            <ResumeAnalyzer />

          </ProtectedRoute>
        }
      />


      {/* ================= RESUME MATCHER ================= */}

      <Route
        path="/resume-matcher"
        element={
          <ProtectedRoute>

            <ResumeMatcher />

          </ProtectedRoute>
        }
      />


      {/* ================= INTERVIEW SETUP ================= */}

      <Route
        path="/interview/setup"
        element={
          <ProtectedRoute>

            <InterviewSetup />

          </ProtectedRoute>
        }
      />


      {/* ================= INTERVIEW SESSION ================= */}

      <Route
        path="/interview/:id"
        element={
          <ProtectedRoute>

            <InterviewPage />

          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default App;