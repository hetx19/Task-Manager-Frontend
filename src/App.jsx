import React, { useContext } from "react";
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

// Context API'S
import UserProvider, { UserContext } from "./context/userContext";

// Routes
import PrivateRoute from "./routes/PrivateRoute";

// Auth Pages
import SignInPage from "./pages/Auth/SignIn";
import SignUpPage from "./pages/Auth/SignUp";

// Admin Pages
import CreateTaskPage from "./pages/Admin/CreateTask";
import ManageTasksPage from "./pages/Admin/ManageTasks";
import ManageUsersPage from "./pages/Admin/ManageUsers";
import AdminDashboardPage from "./pages/Admin/Dashboard";

// User Pages
import UserDashboardPage from "./pages/User/Dashboard";
import MyTasksPage from "./pages/User/MyTasks";
import ViewTaskDetailsPage from "./pages/User/ViewTaskDetails";

const App = () => {
  const [progress, setProgress] = React.useState(0);

  return (
    <UserProvider>
      <div>
        <Router>
          <LoadingBar
            height={3}
            color="#1368ec"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route
              path="/signin"
              element={<SignInPage setProgress={setProgress} />}
            />
            <Route
              path="/signup"
              element={<SignUpPage setProgress={setProgress} />}
            />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/tasks" element={<ManageTasksPage />} />
              <Route path="/admin/users" element={<ManageUsersPage />} />
              <Route path="/admin/new-task" element={<CreateTaskPage />} />
            </Route>

            {/* User Routes */}
            <Route element={<PrivateRoute allowedRoles={["user"]} />}>
              <Route path="/user/dashboard" element={<UserDashboardPage />} />
              <Route path="/user/tasks" element={<MyTasksPage />} />
              <Route path="/user/task/:id" element={<ViewTaskDetailsPage />} />
            </Route>

            {/* Default Routes */}
            <Route path="/" element={<Root />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <Outlet />;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
};
