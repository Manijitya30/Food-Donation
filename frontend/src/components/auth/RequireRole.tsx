import { Navigate } from "react-router-dom";

const RequireRole = ({ role, children }: any) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RequireRole;
