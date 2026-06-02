import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  ArrowLeft,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

const OurCourses = () => {
  const navigate =
    useNavigate();

  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const admin =
      JSON.parse(
        localStorage.getItem(
          "admin"
        )
      );

    if (!admin?.token) {
      navigate(
        "/admin/login"
      );
      return;
    }

    fetchCourses();
  }, []);

  const fetchCourses =
    async () => {
      try {
        const response =
          await api.get(
            "/course/courses"
          );

        setCourses(
          response.data
            .courses || []
        );
      } catch (error) {
        toast.error(
          "Failed to load courses"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleDelete =
    async (courseId) => {
      const confirmDelete =
        window.confirm(
          "Delete this course?"
        );

      if (
        !confirmDelete
      )
        return;

      try {
        const response =
          await api.delete(
            `/course/delete/${courseId}`
          );

        toast.success(
          response.data
            .message
        );

        setCourses(
          courses.filter(
            (
              course
            ) =>
              course._id !==
              courseId
          )
        );
      } catch (error) {
        toast.error(
          error?.response
            ?.data?.errors ||
            "Failed to delete course"
        );
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

          <div>
            <button
              onClick={() =>
                navigate(
                  "/admin/dashboard"
                )
              }
              className="flex items-center gap-2 text-gray-600 mb-3"
            >
              <ArrowLeft size={18} />
              Dashboard
            </button>

            <h1 className="text-4xl font-bold text-gray-900">
              Course Management
            </h1>

            <p className="text-gray-600 mt-2">
              Manage courses and
              lectures.
            </p>
          </div>

          <Link
            to="/admin/create-course"
            className="mt-5 md:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl"
          >
            <Plus size={18} />
            Create Course
          </Link>
        </div>

        {courses.length ===
        0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <BookOpen className="mx-auto h-14 w-14 text-gray-400" />

            <h2 className="text-2xl font-semibold mt-4">
              No Courses Found
            </h2>

            <p className="text-gray-500 mt-2">
              Create your first
              course to get
              started.
            </p>

            <Link
              to="/admin/create-course"
              className="inline-flex mt-6 bg-indigo-600 text-white px-5 py-3 rounded-xl"
            >
              Create Course
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {courses.map(
              (
                course
              ) => (
                <div
                  key={
                    course._id
                  }
                  className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
                >
                  <img
                    src={
                      course
                        ?.image
                        ?.url
                    }
                    alt={
                      course.title
                    }
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-5">

                    <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {
                        course.title
                      }
                    </h2>

                    <p className="text-gray-600 mt-3 line-clamp-3">
                      {
                        course.description
                      }
                    </p>

                    <div className="flex justify-between items-center mt-5">
                      <span className="text-2xl font-bold text-indigo-600">
                        ₹
                        {
                          course.price
                        }
                      </span>

                      <span className="text-sm text-gray-500">
                        Instructor
                      </span>
                    </div>

                    <p className="font-medium mt-1">
                      {
                        course.instructor ||
                        "Learnistiq"
                      }
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-6">

                      <Link
                        to={`/admin/update-course/${course._id}`}
                        className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl"
                      >
                        <Pencil size={18} />
                        Update
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(
                            course._id
                          )
                        }
                        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>

                    <Link
                      to={`/admin/course/${course._id}/lectures`}
                      className="mt-3 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
                    >
                      <BookOpen size={18} />
                      Manage Lectures
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OurCourses;