import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import toast from "react-hot-toast";

import api from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const response =
        await api.post(
          "/user/signup",
          {
            firstName,
            lastName,
            email,
            password,
          }
        );

      toast.success(
        response.data.message ||
          "Account created successfully"
      );

      navigate("/login");
    } catch (error) {
      const message =
        error?.response?.data
          ?.errors ||
        "Signup failed";

      setErrorMessage(
        message
      );

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex items-center justify-center">
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 shadow-sm bg-white/70 backdrop-blur-md">
        <Link
          to="/"
          className="flex items-center space-x-2"
        >
          <BookOpen className="h-8 w-8 text-indigo-600" />

          <span className="text-2xl font-bold text-gray-900">
            Learnistiq
          </span>
        </Link>
      </header>

      <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md mt-20">
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Start your learning
          journey today
        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          <input
            type="text"
            value={firstName}
            onChange={(e) =>
              setFirstName(
                e.target.value
              )
            }
            placeholder="First Name"
            className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) =>
              setLastName(
                e.target.value
              )
            }
            placeholder="Last Name"
            className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          {errorMessage && (
            <div className="text-red-500 text-center text-sm">
              {
                errorMessage
              }
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 rounded-lg transition"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          Already have an
          account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;