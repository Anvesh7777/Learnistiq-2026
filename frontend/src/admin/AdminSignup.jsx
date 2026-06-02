import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  BookOpen,
  ShieldPlus,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

const AdminSignup = () => {
  const navigate =
    useNavigate();

  const [
    firstName,
    setFirstName,
  ] = useState("");

  const [
    lastName,
    setLastName,
  ] = useState("");

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

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
            "/admin/signup",
            {
              firstName,
              lastName,
              email,
              password,
            }
          );

        toast.success(
          response.data
            .message ||
            "Admin account created"
        );

        navigate(
          "/admin/login"
        );
      } catch (error) {
        const message =
          error?.response
            ?.data?.errors ||
          "Signup failed";

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
          to="/admin/login"
          className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Admin Login
        </Link>

      </header>

      <div className="flex items-center justify-center min-h-screen px-6">

        <div className="w-full max-w-lg">

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="flex justify-center mb-6">
              <div className="bg-indigo-100 p-4 rounded-full">
                <ShieldPlus className="h-10 w-10 text-indigo-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center text-gray-900">
              Admin Signup
            </h1>

            <p className="text-center text-gray-500 mt-2 mb-8">
              Create an admin account
              to manage Learnistiq.
            </p>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-5"
            >

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name
                  </label>

                  <input
                    type="text"
                    value={
                      firstName
                    }
                    onChange={(
                      e
                    ) =>
                      setFirstName(
                        e.target
                          .value
                      )
                    }
                    className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="John"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    value={
                      lastName
                    }
                    onChange={(
                      e
                    ) =>
                      setLastName(
                        e.target
                          .value
                      )
                    }
                    className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Doe"
                    required
                  />
                </div>

              </div>

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
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="admin@learnistiq.com"
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
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="********"
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
                  ? "Creating Account..."
                  : "Create Admin Account"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminSignup;