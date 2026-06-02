import React, {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  BookOpen,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate =
    useNavigate();

  const {
    login,
    isAuthenticated,
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    if (
      isAuthenticated
    ) {
      navigate("/");
    }
  }, [
    isAuthenticated,
    navigate,
  ]);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setLoading(true);
      setErrorMessage("");

      try {
        const response =
          await api.post(
            "/user/login",
            {
              email,
              password,
            }
          );

        login(
          response.data
        );

        toast.success(
          response.data
            .message ||
            "Login successful"
        );

        navigate("/");
      } catch (error) {
        const message =
          error?.response?.data
            ?.errors ||
          "Login failed";

        setErrorMessage(
          message
        );

        toast.error(
          message
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">

      <div className="container mx-auto flex min-h-screen items-center justify-center">

        {/* Header */}

        <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 shadow-sm bg-white/70 backdrop-blur-md">

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <BookOpen className="h-8 w-8 text-indigo-600" />

            <span className="text-2xl font-bold text-gray-900">
              Learnistiq
            </span>
          </Link>

          <Link
            to="/signup"
            className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:text-indigo-600 hover:border-indigo-600 transition"
          >
            Register
          </Link>

        </header>

        {/* Login Card */}

        <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md mt-24">

          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Sign in to continue your learning journey
          </p>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >

            {/* Email */}

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Password */}

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Error */}

            {errorMessage && (
              <div className="text-red-500 text-center text-sm">
                {
                  errorMessage
                }
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={
                loading
              }
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 rounded-xl transition"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

          </form>

          <p className="mt-6 text-center text-gray-500">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-indigo-600 hover:underline font-medium"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;