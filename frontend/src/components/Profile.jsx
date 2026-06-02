import React, {
  useEffect,
  useState,
} from "react";

import {
  User,
  Mail,
  BookOpen,
  Trophy,
  TrendingUp,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

const Profile = () => {
  const [user, setUser] =
    useState(null);

  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData =
    async () => {
      try {
        const storedUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            ) || "null"
          );

        setUser(
          storedUser?.user
        );

        const response =
          await api.get(
            "/user/my-courses"
          );

        setCourses(
          response.data
            .courses || []
        );
      } catch (error) {
        toast.error(
          "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  const totalCourses =
    courses.length;

  const completedCourses =
    courses.filter(
      (course) =>
        course.isCourseCompleted
    ).length;

  const inProgressCourses =
    totalCourses -
    completedCourses;

  const averageProgress =
    totalCourses > 0
      ? Math.round(
          courses.reduce(
            (
              total,
              course
            ) =>
              total +
              course.progressPercentage,
            0
          ) / totalCourses
        )
      : 0;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">

        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Profile Header */}

          <div className="bg-white rounded-3xl shadow p-8">

            <div className="flex flex-col md:flex-row items-center gap-6">

              <div className="w-28 h-28 rounded-full bg-indigo-600 text-white flex items-center justify-center text-4xl font-bold">
                {user?.firstName?.charAt(
                  0
                ) || "U"}
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user?.firstName}{" "}
                  {
                    user?.lastName
                  }
                </h1>

                <div className="flex items-center gap-2 mt-2 text-gray-600">
                  <Mail className="w-4 h-4" />

                  <span>
                    {
                      user?.email
                    }
                  </span>
                </div>

                <div className="mt-3 inline-flex px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  Active Learner
                </div>
              </div>

            </div>

          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-4 gap-6 mt-8">

            <div className="bg-white rounded-2xl p-6 shadow">
              <BookOpen className="w-8 h-8 text-indigo-600 mb-3" />

              <h3 className="text-3xl font-bold">
                {totalCourses}
              </h3>

              <p className="text-gray-500">
                Total Courses
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <Trophy className="w-8 h-8 text-green-600 mb-3" />

              <h3 className="text-3xl font-bold">
                {
                  completedCourses
                }
              </h3>

              <p className="text-gray-500">
                Completed
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <User className="w-8 h-8 text-orange-600 mb-3" />

              <h3 className="text-3xl font-bold">
                {
                  inProgressCourses
                }
              </h3>

              <p className="text-gray-500">
                In Progress
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />

              <h3 className="text-3xl font-bold">
                {
                  averageProgress
                }
                %
              </h3>

              <p className="text-gray-500">
                Avg Progress
              </p>
            </div>

          </div>

          {/* Recent Courses */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-6">
              Learning Progress
            </h2>

            {courses.length ===
            0 ? (
              <div className="bg-white p-8 rounded-2xl shadow text-center">
                <p className="text-gray-500">
                  No courses purchased
                  yet.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {courses.map(
                  (
                    course
                  ) => (
                    <div
                      key={
                        course._id
                      }
                      className="bg-white rounded-2xl shadow overflow-hidden"
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
                        className="h-48 w-full object-cover"
                      />

                      <div className="p-5">

                        <h3 className="font-semibold text-lg">
                          {
                            course.title
                          }
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {
                            course.instructor
                          }
                        </p>

                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>
                              Progress
                            </span>

                            <span>
                              {
                                course.progressPercentage
                              }
                              %
                            </span>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-indigo-600 h-3 rounded-full"
                              style={{
                                width: `${course.progressPercentage}%`,
                              }}
                            />
                          </div>
                        </div>

                        {course.isCourseCompleted && (
                          <div className="mt-4 text-green-600 font-medium">
                            ✓ Course Completed
                          </div>
                        )}

                      </div>
                    </div>
                  )
                )}

              </div>
            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Profile;