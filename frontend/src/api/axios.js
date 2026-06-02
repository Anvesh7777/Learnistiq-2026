import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL,

  withCredentials: true,

  headers: {
    "Content-Type":
      "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const admin =
      localStorage.getItem(
        "admin"
      );

    const user =
      localStorage.getItem(
        "user"
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