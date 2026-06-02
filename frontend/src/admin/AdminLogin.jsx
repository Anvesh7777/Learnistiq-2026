import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  BookOpen,
  ShieldCheck,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

const AdminLogin = () => {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await api.post(
            "/admin/login",
            {
              email,
              password,
            }
          );

        localStorage.setItem(
          "admin",
          JSON.stringify(
            response.data
          )
        );

        toast.success(
          response.data
            .message ||
            "Login successful"
        );

        navigate(
          "/admin/dashboard"
        );
      } catch (error) {
        const message =
          error?.response
            ?.data?.errors ||
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

      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 bg-white/80 backdrop-blur-md border-b">

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
          to="/admin/signup"
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Admin Signup
        </Link>

      </header>

      <div className="flex items-center justify-center min-h-screen px-6">

        <div className="w-full max-w-md">

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="flex justify-center mb-6">
              <div className="bg-indigo-100 p-4 rounded-full">
                <ShieldCheck className="h-10 w-10 text-indigo-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center text-gray-900">
              Admin Login
            </h1>

            <p className="text-center text-gray-500 mt-2 mb-8">
              Access the Learnistiq
              administration panel.
            </p>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-5"
            >

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(
                    e
                  ) =>
                    setEmail(
                      e.target
                        .value
                    )
                  }
                  placeholder="admin@learnistiq.com"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={
                    password
                  }
                  onChange={(
                    e
                  ) =>
                    setPassword(
                      e.target
                        .value
                    )
                  }
                  placeholder="********"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>

              {errorMessage && (
                <div className="text-red-500 text-sm text-center">
                  {
                    errorMessage
                  }
                </div>
              )}

              <button
                type="submit"
                disabled={
                  loading
                }
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-xl font-medium transition"
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminLogin;