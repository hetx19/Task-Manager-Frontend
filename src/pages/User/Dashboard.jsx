import React from "react";

// Hooks
import { useUserAuth } from "../../hooks/useUserAuth";

const UserDashboardPage = () => {
  useUserAuth();

  return <div>UserDashboardPage</div>;
};

export default UserDashboardPage;
