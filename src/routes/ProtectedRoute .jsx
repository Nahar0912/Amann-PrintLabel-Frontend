import { Navigate } from "react-router-dom";
import { useAuth } from './../hooks/useAuth';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) {
    // Show a loader or empty div while checking auth
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
