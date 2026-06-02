import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  BookOpen,
  CheckCircle,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

const Purchases = () => {
  const navigate =
    useNavigate();

  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses =
    async () => {
      try {
        setLoading(true);

        const response =
          await api.get(
            "/user/my-courses"
          );

        setCourses(
          response.data
            .courses || []
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load your courses"
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

            <p className="text-lg font-medium text-gray-700">
              Loading your courses...
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900">
              My Learning
            </h1>

            <p className="text-gray-600 mt-2">
              Continue your learning journey.
            </p>
          </div>

          {courses.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 shadow text-center">

              <BookOpen className="mx-auto h-16 w-16 text-gray-400" />

              <h2 className="text-2xl font-semibold mt-4">
                No Courses Yet
              </h2>

              <p className="text-gray-500 mt-2">
                Purchase a course and start
                learning today.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/courses"
                  )
                }
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                Explore Courses
              </button>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {courses.map(
                (course) => (
                  <div
                    key={
                      course._id
                    }
                    className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300"
                  >

                    <img
                      src={
                        course
                          .image
                          ?.url
                      }
                      alt={
                        course.title
                      }
                      className="w-full h-52 object-cover"
                    />

                    <div className="p-5">

                      <div className="flex justify-between items-start gap-3">

                        <h2 className="text-xl font-semibold line-clamp-2">
                          {
                            course.title
                          }
                        </h2>

                        {course.isCourseCompleted && (
                          <CheckCircle className="text-green-500 min-w-6 min-h-6" />
                        )}

                      </div>

                      <p className="text-gray-600 mt-3">
                        Track your progress and
                        continue learning.
                      </p>

                      <div className="mt-4">
                        <p className="text-sm text-gray-500">
                          Instructor
                        </p>

                        <p className="font-medium">
                          {
                            course.instructor
                          }
                        </p>
                      </div>

                      <div className="mt-5">

                        <div className="flex justify-between text-sm mb-2">

                          <span>
                            Progress
                          </span>

                          <span className="font-medium">
                            {
                              course.progressPercentage
                            }
                            %
                          </span>

                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3">

                          <div
                            className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                            style={{
                              width: `${course.progressPercentage}%`,
                            }}
                          />

                        </div>

                      </div>

                         {course.isCourseCompleted && (
  <>
    <div className="mt-4 text-green-600 font-medium text-sm">
      ✓ Course Completed
    </div>

    <a
      href={`${import.meta.env.VITE_API_URL}/progress/certificate/${course._id}`}
      target="_blank"
      rel="noreferrer"
      className="w-full mt-3 inline-block text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition"
    >
      Download Certificate
    </a>
  </>
)}

                      <button
                        onClick={() =>
                          navigate(
                            `/watch-course/${course._id}`
                          )
                        }
                        className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition"
                      >
                        {course.isCourseCompleted
                          ? "Revisit Course"
                          : "Continue Learning"}
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Purchases;