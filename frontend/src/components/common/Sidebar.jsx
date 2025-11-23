import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm
     ${isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800"}`;

  return (
    <aside
      className={`
        h-screen bg-black border-r border-gray-800 p-4 flex flex-col
        ${open ? "w-64" : "w-20"} transition-all duration-300
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-400 mb-6 hover:text-white"
      >
        {open ? "←" : "→"}
      </button>

      {/* Profile */}
      {user && (
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center text-xl text-white">
            {user.username?.[0]?.toUpperCase()}
          </div>
          {open && (
            <>
              <p className="mt-2 text-white font-medium">{user.username}</p>
              <p className="text-gray-500 text-xs">@{user.username}</p>
            </>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        <NavLink to="/" className={linkClasses}>
          🏠 {open && "Home"}
        </NavLink>

        <NavLink to="/dashboard" className={linkClasses}>
          📊 {open && "Dashboard"}
        </NavLink>

        <NavLink to="/threads" className={linkClasses}>
          🧵 {open && "Threads"}
        </NavLink>

        <NavLink to="/projects" className={linkClasses}>
          📁 {open && "Projects"}
        </NavLink>

        <NavLink to="/messages" className={linkClasses}>
          💬 {open && "Messages"}
        </NavLink>

        <NavLink to={`/profile/${user?._id}`} className={linkClasses}>
          👤 {open && "My Profile"}
        </NavLink>
      </nav>

      {/* Logout */}
      {user && (
        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-500"
        >
          {open ? "Logout" : "⛔"}
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
