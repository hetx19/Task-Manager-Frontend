import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Context API's
import { UserContext } from "../context/userContext";

export const useUserAuth = () => {
  const { user, loading, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      clearUser();
      navigate("/signin");
    }
  }, [user, loading, clearUser, navigate]);
};
