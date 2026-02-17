import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";
import {toast} from "sonner"

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Profile on Refresh
  const fetchProfile = async () => {
    try {
      const res = await API.get("/user/profile");
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Register
  const register = async (data) => {
    const res = await API.post("/auth/register", data);
    toast.success("Account created successfully!");
    return res.data;
  };

  // Login
  const login = async (data) => {
    const res = await API.post("/auth/login", data);
    setUser(res.data.user);
    toast.success("Login successful!");
    return res.data;
  };

  // Logout
  const logout = async () => {
    await API.post("/auth/logout");
    setUser(null);
    toast.success("Logged out!");
  };

  // Update Profile
  const updateProfile = async (data) => {
    const res = await API.patch("/user/update-profile", data);
    setUser(res.data.user);
    toast.success("Profile updated!");
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);