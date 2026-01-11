import React, { createContext, useState, useEffect } from "react";
import axiosInst from "../utils/axios";
import { API_ENDPOINT } from "../utils/api";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) return;

    const hasToken = Boolean(localStorage.getItem("token"));
    if (!hasToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInst.get(API_ENDPOINT.AUTH.GET_USER);
        setUser(response.data);
      } catch (error) {
        console.error("ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  const updateUser = (userData) => {
    setUser(userData);
    if (userData?.token) {
      localStorage.setItem("token", userData.token);
    }
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    setLoading(false);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{ user, loading, setLoading, updateUser, clearUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
