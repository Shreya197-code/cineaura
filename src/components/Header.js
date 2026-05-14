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
   <header className="absolute top-0 left-0 w-full z-50 bg-gradient-to-b from-black via-black/80 to-transparent px-6 md:px-12 py-3 flex items-center justify-between">

  <img
    className="w-32 md:w-44 relative z-50 cursor-pointer brightness-150 contrast-125 drop-shadow-[0_4px_12px_rgba(0,0,0,1)] hover:scale-105 transition duration-300"
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