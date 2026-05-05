import React from "react";
import ProfileMenu from "./Profilemenu";

import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {

  const location = useLocation();

  const user = useSelector((state) => state.user);

  return (
    <header className="absolute top-0 left-0 w-full z-20 bg-gradient-to-b from-black/90 via-black/60 to-transparent px-6 md:px-12 py-3 flex items-center justify-between">

      {/* Logo */}
      <img
        className="w-32 md:w-44 cursor-pointer hover:scale-105 transition-transform duration-300"
        src="logo_cineaura.png"
        alt="CineAura Logo"
      />

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {user?.email &&
          location.pathname === "/browse" && (
            <div>
              <ProfileMenu />
            </div>
          )}

      </div>

    </header>
  );
};

export default Header;