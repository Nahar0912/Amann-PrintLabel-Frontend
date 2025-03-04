import { useContext } from "react";
import AuthContext from './../context/AuthContext';

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
