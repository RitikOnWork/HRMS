import { Routes, Route, Navigate } from "react-router-dom";

/* Public */
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";

/* Auth wrapper */
import ProtectedRoute from "./components/ProtectedRoute";

/* Dashboards only */
import HRDashboard from "./pages/hr/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import CandidateDashboard from "./pages/candidate/Dashboard";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* HR Dashboard */}
      <Route
        path="/hr/dashboard"
        element={
          <ProtectedRoute role="HR">
            <HRDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Candidate Dashboard */}
      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute role="candidate">
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
