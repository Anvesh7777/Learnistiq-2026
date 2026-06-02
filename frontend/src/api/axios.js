import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser?.token) {
        config.headers.Authorization =
          `Bearer ${parsedUser.token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.request.use(
  (config) => {
    const user =
      localStorage.getItem(
        "user"
      );

    const admin =
      localStorage.getItem(
        "admin"
      );

    if (admin) {
      const parsedAdmin =
        JSON.parse(admin);

      if (
        parsedAdmin?.token
      ) {
        config.headers.Authorization =
          `Bearer ${parsedAdmin.token}`;

        return config;
      }
    }

    if (user) {
      const parsedUser =
        JSON.parse(user);

      if (
        parsedUser?.token
      ) {
        config.headers.Authorization =
          `Bearer ${parsedUser.token}`;
      }
    }

    return config;
  },
  (error) =>
    Promise.reject(error)
);

export default api;