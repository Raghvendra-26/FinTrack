import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TrendingUp, User, LogOut, Pencil, Menu, X } from "lucide-react";
import EditProfileModal from "../components/EditProfileModal";

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">FinTrack</span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">
                {user?.username}
              </span>
            </div>

            <button
              onClick={() => setShowProfile(true)}
              className="rounded-xl border px-3 py-2 hover:bg-muted"
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl border px-4 py-2 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="border-t bg-white px-4 py-3 sm:hidden">
            <p className="mb-3 text-sm font-medium">{user?.username}</p>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowProfile(true);
                  setMenuOpen(false);
                }}
                className="flex-1 rounded-xl border py-2 hover:bg-muted"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 rounded-xl border py-2 text-destructive hover:bg-destructive/10"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {showProfile && (
        <EditProfileModal onClose={() => setShowProfile(false)} />
      )}
    </>
  );
};

export default DashboardNavbar;
