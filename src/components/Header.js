import React, { useEffect } from "react";
import ProfileMenu from "./Profilemenu";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";
import { useLocation } from "react-router-dom";
import { toggleGPTSearchView } from "../utils/gptslice";
import { changeLanguage } from "../utils/configslice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";



const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const showGPTSearch = useSelector((state) => state.gpt.showGPTSearch);
  const language = useSelector((state) => state.config?.language || "en");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;

        dispatch(
          addUser({
            uid,
            email,
            name: displayName || "User",
          })
        );
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-gradient-to-b from-black via-black/80 to-transparent px-6 md:px-12 py-3 flex items-center justify-between">
      {/* Logo */}
      <img
        className="w-32 md:w-44 relative z-50 cursor-pointer brightness-150 contrast-125 drop-shadow-[0_4px_12px_rgba(0,0,0,1)] hover:scale-105 transition duration-300"
        src="logo_cineaura.png"
        alt="CineAura Logo"
      />

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {showGPTSearch && (
          <select
            className="p-2 m-2 bg-gray-900 text-white rounded"
            value={language}
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        )}

        {/* GPT Search Button */}
        <button
          onClick={handleGPTSearchClick}
          className="
            relative overflow-hidden
            px-5 py-2.5
            rounded-full
            bg-white/10
            backdrop-blur-md
            border border-white/20
            text-white font-semibold tracking-wide
            shadow-lg shadow-cyan-500/20
            hover:bg-cyan-500
            hover:shadow-cyan-400/50
            hover:scale-105
            active:scale-95
            transition-all duration-300
            before:absolute before:inset-0
            before:bg-gradient-to-r
            before:from-cyan-400/20
            before:to-purple-500/20
            before:opacity-0
            hover:before:opacity-100
          "
        >
          <span className="relative z-10 flex items-center gap-2">
            {showGPTSearch ?"HomePage":"🔍 GPT Search"}
          </span>
        </button>
        

        {user?.email && location.pathname.startsWith("/browse") && (
          <ProfileMenu />
        )}
      </div>
    </header>
  );
};

export default Header;