export const BASE_URL =
  import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5001";

export const API_ENDPOINT = {
  AUTH: {
    SIGNIN: "/api/auth/signin",
    SIGNUP: "/api/auth/signup",
    GET_USER: "/api/auth/profile",
    UPDATE_USER: "/api/auth/profile",
    DELETE_USER: "/api/auth/profile",
  },
  USERS: {
    GET_ALL_USERS: "/api/user",
    GET_USER_BY_ID: (userID) => `/api/user/${userID}`,
  },
  TASKS: {
    GET_DASHBOARD_DATA: "/api/task/dashboard",
    GET_USER_DASHBOARD_DATA: "/api/task/user-dashboard-data",
    GET_ALL_TASKS: "/api/task",
    GET_TASK_BY_ID: (taskID) => `/api/task/${taskID}`,
    CREATE_NEW_TASK: "/api/task",
    UPDATE_TASK: (taskID) => `/api/task/${taskID}`,
    DELETE_TASK: (taskID) => `/api/task/${taskID}`,
    UPDATE_TASK_STATUS: (taskID) => `/api/task/${taskID}/status`,
    UPDATE_TASK_TODO: (taskID) => `/api/task/${taskID}/todo`,
  },
  REPORT: {
    USERS_REPORT: "/api/report/export/users",
    TASKS_REPORT: "/api/report/export/tasks",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
    UPDATE_IMAGE: "/api/auth/update-image",
  },
};
