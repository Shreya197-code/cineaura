import React, { useEffect, useState } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 w-full z-50 px-4 md:px-12 py-3 flex items-center justify-between transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-elevated"
          : "bg-gradient-to-b from-background/95 via-background/60 to-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-8">
        <img
          className="w-28 md:w-36 cursor-pointer drop-shadow-md hover:opacity-90 transition duration-300"
          src="logo_cineaura.png"
          alt="CineAura Logo"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 md:gap-4">
        {showGPTSearch && (
          <select
            className="px-3 py-1.5 bg-surface text-text border border-border rounded-md text-sm outline-none focus:ring-2 focus:ring-accent transition-colors"
            value={language}
            onChange={handleLanguageChange}
            aria-label="Select Language"
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
          className="px-4 py-2 rounded-md bg-accent/15 border border-accent/40 text-accent font-medium text-sm tracking-wide shadow-sm hover:bg-accent hover:text-background active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent flex items-center gap-2"
        >
          <span>{showGPTSearch ? "🏠 Home" : "✨ GPT Search"}</span>
        </button>

        {user?.email && location.pathname.startsWith("/browse") && (
          <ProfileMenu />
        )}
      </div>
    </header>
  );
};

export default Header;