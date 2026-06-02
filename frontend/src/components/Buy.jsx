import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  BookOpen,
  Award,
  Infinity,
  CheckCircle,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

const Buy = () => {
  const { courseId } =
    useParams();

  const navigate =
    useNavigate();

  const [course, setCourse] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse =
    async () => {
      try {
        const response =
          await api.get(
            `/course/public/${courseId}`
          );

        setCourse(
          response.data.course
        );
      } catch (error) {
        toast.error(
          "Failed to load course"
        );

        navigate(
          "/courses"
        );
      } finally {
        setPageLoading(false);
      }
    };

  const handlePurchase =
    async () => {
      try {
        setLoading(true);

        const response =
          await api.post(
            `/course/buy/${courseId}`
          );

        toast.success(
          response.data.message
        );

        navigate(
          "/purchases"
        );
      } catch (error) {
        if (
          error?.response
            ?.status === 400
        ) {
          toast.error(
            "You have already purchased this course"
          );
        } else {
          toast.error(
            error?.response
              ?.data?.errors ||
              "Purchase failed"
          );
        }
      } finally {
        setLoading(false);
      }
    };

  if (pageLoading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

            <p>
              Loading course...
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

      <div className="min-h-screen bg-gray-50 py-12">

        <div className="max-w-6xl mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Left */}

            <div>

              <img
                src={
                  course?.image
                    ?.url
                }
                alt={
                  course?.title
                }
                className="w-full h-[400px] object-cover rounded-3xl shadow-lg"
              />

            </div>

            {/* Right */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h1 className="text-4xl font-bold">
                {course?.title}
              </h1>

              <p className="mt-4 text-gray-600">
                {
                  course?.description
                }
              </p>

              <div className="mt-6">

                <p className="text-sm text-gray-500">
                  Instructor
                </p>

                <p className="font-semibold text-lg">
                  {
                    course?.instructor
                  }
                </p>

              </div>

              <div className="mt-8">

                <span className="text-4xl font-bold text-indigo-600">
                  ₹
                  {
                    course?.price
                  }
                </span>

              </div>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">
                  <Infinity className="text-green-600" />

                  <span>
                    Lifetime Access
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="text-green-600" />

                  <span>
                    Certificate of Completion
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <BookOpen className="text-green-600" />

                  <span>
                    Lecture Notes Included
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-600" />

                  <span>
                    Progress Tracking
                  </span>
                </div>

              </div>

              <button
                onClick={
                  handlePurchase
                }
                disabled={
                  loading
                }
                className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-lg font-semibold transition"
              >
                {loading
                  ? "Processing..."
                  : `Buy Now • ₹${course?.price}`}
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Buy;