import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem(
          "user"
        );

      if (storedUser) {
        setUser(
          JSON.parse(storedUser)
        );
      }
    } catch (error) {
      console.error(
        "Auth initialization error:",
        error
      );

      localStorage.removeItem(
        "user"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(
      "user"
    );

    setUser(null);
  };

  const isAuthenticated =
    !!user?.token;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);

export default AuthContext;