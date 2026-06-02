import React, {
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  BookOpen,
  Mail,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await api.post(
            "/user/forgot-password",
            {
              email,
            }
          );

        toast.success(
          response.data
            .message ||
            "Reset email sent"
        );

        setSuccess(true);
      } catch (error) {
        toast.error(
          error?.response?.data
            ?.errors ||
            "Failed to send email"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">

        <div className="text-center mb-8">

          <BookOpen className="w-12 h-12 mx-auto text-indigo-600" />

          <h1 className="text-3xl font-bold mt-4">
            Forgot Password
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your email and we'll send you a password reset link.
          </p>

        </div>

        {success ? (
          <div className="text-center">

            <Mail className="w-12 h-12 mx-auto text-green-500" />

            <h2 className="text-xl font-semibold mt-4">
              Email Sent
            </h2>

            <p className="text-gray-600 mt-2">
              Check your inbox for password reset instructions.
            </p>

          </div>
        ) : (
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Enter your email"
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <button
              type="submit"
              disabled={
                loading
              }
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>

          </form>
        )}

        <div className="text-center mt-6">

          <Link
            to="/login"
            className="text-indigo-600 hover:underline"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;