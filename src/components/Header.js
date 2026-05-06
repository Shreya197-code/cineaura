import React, { useEffect } from "react";
import ProfileMenu from "./Profilemenu";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";
import { useLocation } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);

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

  return (
    <header className="absolute top-0 left-0 w-full z-20 bg-gradient-to-b from-black/90 via-black/60 to-transparent px-6 md:px-12 py-3 flex items-center justify-between">

      <img
        className="w-32 md:w-44 cursor-pointer hover:scale-105 transition-transform duration-300"
        src="logo_cineaura.png"
        alt="CineAura Logo"
      />

      <div className="flex items-center gap-4">
        {user?.email && location.pathname.startsWith("/browse") && (
          <ProfileMenu />
        )}
      </div>

    </header>
  );
};

export default Header;