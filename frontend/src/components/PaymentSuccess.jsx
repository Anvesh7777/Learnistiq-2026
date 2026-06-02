import React from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  CheckCircle,
  BookOpen,
} from "lucide-react";

const PaymentSuccess = () => {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const enrolledCourses =
    location.state
      ?.enrolledCourses || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-6">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-xl p-10">
        <div className="flex justify-center">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        <h1 className="text-4xl font-bold text-center text-gray-900 mt-6">
          Payment Successful 🎉
        </h1>

        <p className="text-center text-gray-600 mt-4">
          Your enrollment has been
          completed successfully.
        </p>

        <p className="text-center text-gray-600 mt-2">
          A confirmation email has
          been sent to your
          registered email address.
        </p>

        {enrolledCourses.length >
          0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Enrolled Courses
            </h2>

            <div className="space-y-3">
              {enrolledCourses.map(
                (
                  course,
                  index
                ) => (
                  <div
                    key={
                      index
                    }
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-4"
                  >
                    <BookOpen className="w-5 h-5 text-indigo-600" />

                    <span className="font-medium">
                      {
                        course
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mt-10">
          <button
            onClick={() =>
              navigate(
                "/purchases"
              )
            }
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium"
          >
            Start Learning
          </button>

          <button
            onClick={() =>
              navigate(
                "/courses"
              )
            }
            className="flex-1 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl font-medium"
          >
            Explore More Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;