import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const ProfileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

    const handlelogout=()=>{
        const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  navigate("/");
}).catch((error) => {
    navigate("/error");
  // An error happened.
});
    }

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded-md transition"
      >
        <img
          className="w-10 h-10 rounded-md border border-gray-400"
          alt="User Icon"
          src="https://occ-0-4344-3647.1.nflxso.net/dnm/api/v6/SO2HoVCx33X8phZh2pZZmQ4QgNY/AAAABS8sWFjSyj1zyfgcnGamqyJ1E2ZubZGo8dndCM_ipf_5UpmVlkuf8IXzQlmPZQqTMWNjWukESRdLkFGHnf7zbY3MJCO3r4s.png?r=229"
        />

        <ChevronDown
          size={18}
          className={`text-white transition-transform duration-300 ${
            showMenu ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
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

          <button  onClick={handlelogout}   className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-600 hover:text-white">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;