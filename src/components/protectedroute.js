import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckingAuth(false);
    }, 400); // Small delay to let Firebase Auth resolve session

    return () => clearTimeout(timer);
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center gap-4">
        <img
          src="logo_cineaura.png"
          alt="CineAura"
          className="w-36 drop-shadow-md animate-pulse"
        />
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user?.email) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;