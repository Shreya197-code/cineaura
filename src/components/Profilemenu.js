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
        className="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded-md transition"
      >
        <img
          className="w-10 h-10 rounded-md border border-gray-400"
          alt="User Icon"
          src={LOGO_IMAGE}
        />

        <ChevronDown
          size={18}
          className={`text-white transition-transform duration-300 ${
            showMenu ? "rotate-180" : ""
          }`}
        />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-3 w-56 bg-black/95 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
          
          <button className="w-full text-left px-4 py-3 text-white hover:bg-white/10">
            Manage Profile
          </button>

          <button className="w-full text-left px-4 py-3 text-white hover:bg-white/10">
            Account
          </button>

          <button className="w-full text-left px-4 py-3 text-white hover:bg-white/10">
            Help Center
          </button>

          <div className="border-t border-gray-700"></div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-600 hover:text-white"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;