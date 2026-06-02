import React, {
  useState,
} from "react";

import {
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";

import {
  Lock,
  BookOpen,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

const ResetPassword = () => {
  const navigate =
    useNavigate();

  const { token } =
    useParams();

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        password !==
        confirmPassword
      ) {
        return toast.error(
          "Passwords do not match"
        );
      }

      try {
        setLoading(true);

        const response =
          await api.post(
            `/user/reset-password/${token}`,
            {
              password,
            }
          );

        toast.success(
          response.data
            .message ||
            "Password reset successful"
        );

        navigate(
          "/login"
        );
      } catch (error) {
        toast.error(
          error?.response?.data
            ?.errors ||
            "Reset failed"
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
            Reset Password
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new password for your account.
          </p>

        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >

          <div className="relative">

            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="New Password"
              className="w-full border rounded-xl pl-10 pr-4 py-3"
              required
            />

          </div>

          <div className="relative">

            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

            <input
              type="password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm Password"
              className="w-full border rounded-xl pl-10 pr-4 py-3"
              required
            />

          </div>

          <button
            type="submit"
            disabled={
              loading
            }
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>

        </form>

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

export default ResetPassword;