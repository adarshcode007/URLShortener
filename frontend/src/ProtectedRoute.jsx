import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "./hooks/useApi";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/me");
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Checking auth...</p>;
  }

  if (!isAuth) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
