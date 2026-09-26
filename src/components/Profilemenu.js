import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { LOGO_IMAGE } from "../utils/constants";

const ProfileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setShowMenu(false);
      await signOut(auth);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-1.5 p-1 rounded-md hover:bg-surface/80 border border-transparent hover:border-border transition-all focus:outline-none focus:ring-2 focus:ring-accent"
        aria-expanded={showMenu}
        aria-haspopup="true"
        aria-label="User Profile Menu"
      >
        <img
          className="w-9 h-9 rounded-md border border-border object-cover"
          alt="User Icon"
          src={LOGO_IMAGE}
        />

        <ChevronDown
          size={16}
          className={`text-text-muted transition-transform duration-200 ${
            showMenu ? "rotate-180" : ""
          }`}
        />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-52 bg-surface-elevated/95 backdrop-blur-xl border border-border rounded-md shadow-elevated overflow-hidden py-1 z-50">
          <button className="w-full text-left px-4 py-2.5 text-sm text-text hover:bg-white/5 hover:text-accent transition-colors focus:bg-white/5 focus:outline-none">
            Manage Profile
          </button>

          <button className="w-full text-left px-4 py-2.5 text-sm text-text hover:bg-white/5 hover:text-accent transition-colors focus:bg-white/5 focus:outline-none">
            Account
          </button>

          <button className="w-full text-left px-4 py-2.5 text-sm text-text hover:bg-white/5 hover:text-accent transition-colors focus:bg-white/5 focus:outline-none">
            Help Center
          </button>

          <div className="border-t border-border my-1"></div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 text-sm text-error hover:bg-error/15 transition-colors focus:bg-error/15 focus:outline-none font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;