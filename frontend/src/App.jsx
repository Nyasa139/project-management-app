import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tickets from "./pages/Tickets";
import Kanban from "./pages/Kanban";
import Team from "./pages/Team";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

// 🔐 Private Route
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
        <Route
          path="/projects"
          element={<PrivateRoute><Projects /></PrivateRoute>}
        />
        <Route
          path="/tickets"
          element={<PrivateRoute><Tickets /></PrivateRoute>}
        />
        <Route
          path="/kanban"
          element={<PrivateRoute><Kanban /></PrivateRoute>}
        />
        <Route
          path="/team"
          element={<PrivateRoute><Team /></PrivateRoute>}
        />
        <Route
          path="/reports"
          element={<PrivateRoute><Reports /></PrivateRoute>}
        />
        <Route
          path="/settings"
          element={<PrivateRoute><Settings /></PrivateRoute>}
        />

        {/* Default Catch-All (ONLY ONCE) */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}
