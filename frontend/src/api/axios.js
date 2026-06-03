import axios from "axios";
import toast from "react-hot-toast";

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status =
      error?.response?.status;

    const code =
      error?.response?.data
        ?.code;

    if (
      status === 401 &&
      (code ===
        "TOKEN_EXPIRED" ||
        code ===
          "INVALID_TOKEN")
    ) {
      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "admin"
      );

      toast.error(
        "Session expired. Please login again."
      );

      window.location.href =
        "/login";
    }

    return Promise.reject(
      error
    );
  }
);

export default api;