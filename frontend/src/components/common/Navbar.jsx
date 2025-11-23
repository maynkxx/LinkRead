import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1 rounded-md text-sm font-medium transition 
    ${isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800/70"}`;

  return (
    <header className="w-full border-b border-gray-800 bg-black/80 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
            L
          </span>
          <span className="text-white font-semibold text-lg tracking-tight">
            LinkRead
          </span>
        </Link>

        {/* Center nav links */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/threads" className={navLinkClass}>
            Threads
          </NavLink>
          <NavLink to="/projects" className={navLinkClass}>
            Projects
          </NavLink>
          <NavLink to="/messages" className={navLinkClass}>
            Messages
          </NavLink>
        </nav>

        {/* Right side: user / auth actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to={`/profile/${user._id || "me"}`}
                className="hidden sm:flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm text-white">
                  {user.username?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-sm text-gray-200 max-w-[120px] truncate">
                  {user.username}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm rounded-md border border-gray-700 text-gray-200 hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 text-sm rounded-md text-gray-200 hover:bg-gray-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-500"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
