import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  BookOpen,
  GraduationCap,
  PlusCircle,
  LogOut,
  Home,
  IndianRupee,
  Users,
  Award,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

const Dashboard = () => {
  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [analytics, setAnalytics] =
    useState({
      totalStudents: 0,
      totalCourses: 0,
      totalEnrollments: 0,
      totalRevenue: 0,
      completedCourses: 0,
    });

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

    fetchDashboardData();
  }, []);

  const fetchDashboardData =
    async () => {
      try {
        const response =
  await api.get(
    "/analytics"
  );

        setAnalytics(
          response.data.analytics
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load analytics"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleLogout =
    async () => {
      try {
        await api.get(
          "/admin/logout"
        );

        localStorage.removeItem(
          "admin"
        );

        toast.success(
          "Logged out successfully"
        );

        navigate(
          "/admin/login"
        );
      } catch (error) {
        toast.error(
          "Logout failed"
        );
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-lg font-medium">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Hero Section */}

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex items-center gap-4">

            <BookOpen className="w-12 h-12" />

            <div>

              <h1 className="text-4xl font-bold">
                Learnistiq Admin
              </h1>

              <p className="text-indigo-100 mt-2">
                Monitor platform growth,
                manage courses and track
                learning analytics.
              </p>

            </div>

          </div>

        </div>

        {/* Analytics Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">

            <Users className="text-blue-600 mb-4" />

            <h3 className="text-gray-500">
              Students
            </h3>

            <p className="text-4xl font-bold mt-2">
              {
                analytics.totalStudents
              }
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">

            <BookOpen className="text-indigo-600 mb-4" />

            <h3 className="text-gray-500">
              Courses
            </h3>

            <p className="text-4xl font-bold mt-2">
              {
                analytics.totalCourses
              }
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">

            <GraduationCap className="text-green-600 mb-4" />

            <h3 className="text-gray-500">
              Enrollments
            </h3>

            <p className="text-4xl font-bold mt-2">
              {
                analytics.totalEnrollments
              }
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">

            <IndianRupee className="text-emerald-600 mb-4" />

            <h3 className="text-gray-500">
              Revenue
            </h3>

            <p className="text-3xl font-bold mt-2">
              ₹
              {analytics.totalRevenue.toLocaleString()}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">

            <Award className="text-orange-500 mb-4" />

            <h3 className="text-gray-500">
              Certificates
            </h3>

            <p className="text-4xl font-bold mt-2">
              {
                analytics.completedCourses
              }
            </p>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            <Link
              to="/admin/create-course"
              className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
            >

              <PlusCircle className="text-indigo-600 mb-4" />

              <h3 className="font-semibold text-lg">
                Create Course
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Add a new course to
                the platform.
              </p>

            </Link>

            <Link
              to="/admin/our-courses"
              className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
            >

              <BookOpen className="text-green-600 mb-4" />

              <h3 className="font-semibold text-lg">
                Manage Courses
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Update, delete and
                manage lectures.
              </p>

            </Link>

            <Link
              to="/"
              className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
            >

              <Home className="text-orange-500 mb-4" />

              <h3 className="font-semibold text-lg">
                Visit Website
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Open student-facing
                platform.
              </p>

            </Link>

            <button
              onClick={
                handleLogout
              }
              className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition text-left"
            >

              <LogOut className="text-red-500 mb-4" />

              <h3 className="font-semibold text-lg">
                Logout
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Securely sign out of
                admin dashboard.
              </p>

            </button>

          </div>

        </div>

        {/* Overview */}

        <div className="mt-10 bg-white rounded-2xl shadow p-8">

          <h2 className="text-2xl font-bold mb-4">
            Platform Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <h3 className="font-semibold mb-2">
                Learning Metrics
              </h3>

              <ul className="space-y-2 text-gray-600">

                <li>
                  👨‍🎓 Total Students:{" "}
                  {
                    analytics.totalStudents
                  }
                </li>

                <li>
                  📚 Total Courses:{" "}
                  {
                    analytics.totalCourses
                  }
                </li>

                <li>
                  🎓 Enrollments:{" "}
                  {
                    analytics.totalEnrollments
                  }
                </li>

              </ul>

            </div>

            <div>

              <h3 className="font-semibold mb-2">
                Business Metrics
              </h3>

              <ul className="space-y-2 text-gray-600">

                <li>
                  💰 Revenue: ₹
                  {analytics.totalRevenue.toLocaleString()}
                </li>

                <li>
                  🏆 Certificates Issued:{" "}
                  {
                    analytics.completedCourses
                  }
                </li>

                <li>
                  🚀 Platform Status:
                  Active
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;