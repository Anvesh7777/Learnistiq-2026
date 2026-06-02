import React, {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Star,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import api from "../api/axios";

const Courses = () => {
  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const fetchCourses =
    async (
      pageNumber = 1
    ) => {
      try {
        setLoading(true);

        const response =
          await api.get(
            `/course/courses?page=${pageNumber}&limit=12`
          );

        setCourses(
          response.data.courses
        );

        setTotalPages(
          response.data.totalPages
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const searchCourses =
    async (
      query,
      pageNumber = 1
    ) => {
      try {
        setLoading(true);

        const response =
          await api.get(
            `/course/search?q=${query}&page=${pageNumber}&limit=12`
          );

        setCourses(
          response.data.courses
        );

        setTotalPages(
          response.data.totalPages
        );
      } catch (error) {
        console.log(error);

        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    const timer =
      setTimeout(() => {
        if (
          search.trim()
        ) {
          searchCourses(
            search,
            1
          );
        } else {
          fetchCourses(1);
        }
      }, 500);

    return () =>
      clearTimeout(
        timer
      );
  }, [search]);

  useEffect(() => {
    if (
      search.trim()
    ) {
      searchCourses(
        search,
        page
      );
    } else {
      fetchCourses(page);
    }
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Explore Courses
          </h1>

          <p className="text-gray-600 mt-2">
            Learn in-demand
            skills and
            accelerate your
            career.
          </p>
        </div>

        <div className="relative mb-10">
          <Search className="absolute left-4 top-3.5 text-gray-400" />

          <input
            type="text"
            placeholder="Search courses, instructors..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full bg-white border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {loading ? (
          <div className="text-center py-20 text-lg">
            Loading
            courses...
          </div>
        ) : courses.length ===
          0 ? (
          <div className="text-center py-20 text-gray-500">
            No courses
            found.
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                          .image
                          ?.url
                      }
                      alt={
                        course.title
                      }
                      className="w-full h-52 object-cover"
                    />

                    <div className="p-5">
                      <h2 className="text-xl font-semibold line-clamp-2">
                        {
                          course.title
                        }
                      </h2>

                      <p className="text-gray-600 mt-3 line-clamp-3">
                        {
                          course.description
                        }
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

                      <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center gap-1">
                          <Star
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />

                          <span className="font-medium">
                            {course.averageRating ||
                              0}
                          </span>

                          <span className="text-sm text-gray-500">
                            (
                            {course.totalRatings ||
                              0}
                            )
                          </span>
                        </div>

                        <span className="text-xl font-bold text-indigo-600">
                          ₹
                          {
                            course.price
                          }
                        </span>
                      </div>

                      <Link
                        to={`/course/${course._id}`}
                        className="block mt-5 text-center bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="flex justify-center items-center gap-3 mt-12">
              <button
                disabled={
                  page === 1
                }
                onClick={() =>
                  setPage(
                    (
                      prev
                    ) =>
                      prev -
                      1
                  )
                }
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              <span className="font-medium">
                Page {page} of{" "}
                {
                  totalPages
                }
              </span>

              <button
                disabled={
                  page ===
                  totalPages
                }
                onClick={() =>
                  setPage(
                    (
                      prev
                    ) =>
                      prev +
                      1
                  )
                }
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;