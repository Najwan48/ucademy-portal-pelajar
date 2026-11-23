import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("user_token");
  const userRole = localStorage.getItem("user_role");

  if (!token) {
    const loginPath =
      allowedRole === "admin"
        ? "/login-admin"
        : allowedRole === "mahasiswa"
          ? "/login-pelajar"
          : "/login";

    return <Navigate to={loginPath} replace />;
  }

  if (userRole !== allowedRole) {
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  return children;
}

