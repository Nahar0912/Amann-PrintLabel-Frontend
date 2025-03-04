import { useState, useEffect } from "react";
import api from "../services/api";
import AuthContext from './AuthContext';

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); 

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await api.get("/auth/check"); 
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false); 
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (formData) => {
    try {
      await api.post("/auth/login", formData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      throw new Error("Invalid email or password.");
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {!isCheckingAuth && children} 
    </AuthContext.Provider>
  );
};
