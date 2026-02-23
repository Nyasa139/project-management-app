import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  KanbanSquare,
  Ticket,
  Users,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";
import { motion } from "framer-motion";

export default function MainLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all stored auth data
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login and prevent going back
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">

      {/* Sidebar */}
      <div className="w-64 bg-white/70 backdrop-blur-xl shadow-xl border-r border-white/40 p-6">

        <h1 className="text-2xl font-bold text-indigo-600 mb-10">
          🚀 ProManage
        </h1>

        <nav className="space-y-3">

          <SidebarLink
            to="/dashboard"
            icon={<LayoutDashboard size={18} />}
            text="Dashboard"
          />
          <SidebarLink
            to="/projects"
            icon={<FolderKanban size={18} />}
            text="Projects"
          />
          <SidebarLink
            to="/kanban"
            icon={<KanbanSquare size={18} />}
            text="Kanban"
          />
          <SidebarLink
            to="/tickets"
            icon={<Ticket size={18} />}
            text="Tickets"
          />
          <SidebarLink
            to="/team"
            icon={<Users size={18} />}
            text="Team"
          />
          <SidebarLink
            to="/reports"
            icon={<BarChart3 size={18} />}
            text="Reports"
          />
          <SidebarLink
            to="/settings"
            icon={<Settings size={18} />}
            text="Settings"
          />

        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-2 text-red-500 hover:text-red-700 transition"
        >
          <LogOut size={18} /> Logout
        </button>

      </div>

      {/* Content */}
      <motion.div
        className="flex-1 p-10 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>

    </div>
  );
}

function SidebarLink({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-100 transition"
    >
      {icon} {text}
    </Link>
  );
}
