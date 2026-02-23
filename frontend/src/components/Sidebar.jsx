import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = (path) =>
    `flex items-center gap-3 p-3 rounded-xl transition ${
      location.pathname === path
        ? "bg-white/20 backdrop-blur-md"
        : "hover:bg-white/10"
    }`;

  const handleLogout = () => {
    // Clear everything
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    // Force redirect
    navigate("/login", { replace: true });

    // Force React to re-evaluate routes
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-indigo-700 via-purple-700 to-pink-600 text-white p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-12 tracking-tight">
          🚀 ProManage
        </h1>

        <nav className="space-y-3 text-lg">
          <Link to="/dashboard" className={linkClass("/dashboard")}>
            📊 Dashboard
          </Link>
          <Link to="/projects" className={linkClass("/projects")}>
            📁 Projects
          </Link>
          <Link to="/tickets" className={linkClass("/tickets")}>
            🐛 Tickets
          </Link>
          <Link to="/kanban" className={linkClass("/kanban")}>
            📌 Kanban
          </Link>
          <Link to="/team" className={linkClass("/team")}>
            👥 Team
          </Link>
          <Link to="/reports" className={linkClass("/reports")}>
            📈 Reports
          </Link>
          <Link to="/settings" className={linkClass("/settings")}>
            ⚙ Settings
          </Link>
        </nav>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleLogout}
          className="w-full bg-white/20 hover:bg-red-500 transition p-2 rounded-xl"
        >
          🚪 Logout
        </button>

        <p className="text-sm opacity-70 text-center">
          © 2026 ProManage
        </p>
      </div>
    </div>
  );
}
