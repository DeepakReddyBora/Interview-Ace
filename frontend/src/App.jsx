import { Routes, Route } from "react-router-dom";
import ResumeAnalyzer from "./pages/ResumeAnalyzer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import InterviewSetup from "./pages/InterviewSetup.jsx";
import InterviewPage from "./pages/InterviewPage.jsx";
import ResumeMatcher from "./pages/ResumeMatcher.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const App = () => {

  return (
    <Routes>

      {/* Home */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* Auth Routes */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* Protected Dashboard */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
  path="/resume-analyzer"
  element={
    <ProtectedRoute>
      <ResumeAnalyzer />
    </ProtectedRoute>
  }
/>

      <Route
  path="/resume-matcher"
  element={
    <ProtectedRoute>
      <ResumeMatcher />
    </ProtectedRoute>
  }
/>

      {/* Interview Setup */}

      <Route
        path="/interview/setup"
        element={
          <ProtectedRoute>
            <InterviewSetup />
          </ProtectedRoute>
        }
      />


      {/* Interview Session */}

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