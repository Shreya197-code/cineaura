import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckingAuth(false);
    }, 500); // small delay to let Firebase update

    return () => clearTimeout(timer);
  }, []);

  if (checkingAuth) return null; // or loader

  if (!user?.email) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;