import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Star,
  ShoppingCart,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

const Coursedetail = () => {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [course, setCourse] =
    useState(null);

  const [reviews, setReviews] =
    useState([]);

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const fetchCourse =
    async () => {
      try {
        const response =
          await api.get(
            `/course/public/${id}`
          );

        setCourse(
          response.data.course
        );
      } catch (error) {
        toast.error(
          "Failed to load course"
        );
      }
    };

  const fetchReviews =
    async () => {
      try {
        const response =
          await api.get(
            `/course/reviews/${id}`
          );

        setReviews(
          response.data.reviews ||
            []
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    const loadData =
      async () => {
        setLoading(true);

        await Promise.all([
          fetchCourse(),
          fetchReviews(),
        ]);

        setLoading(false);
      };

    loadData();
  }, [id]);

  const addToCart = () => {
    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (!user) {
      toast.error(
        "Please login first"
      );

      navigate("/login");

      return;
    }

    const cart =
      JSON.parse(
        localStorage.getItem(
          "cart"
        )
      ) || [];

    const exists =
      cart.some(
        (item) =>
          item._id ===
          course._id
      );

    if (exists) {
      toast(
        "Course already in cart"
      );

      return;
    }

    cart.push(course);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    toast.success(
      "Added to cart"
    );
  };

  const buyNow = () => {
    addToCart();

    setTimeout(() => {
      navigate("/cart");
    }, 500);
  };

  const submitReview =
    async (e) => {
      e.preventDefault();

      try {
        const response =
          await api.post(
            `/course/review/${id}`,
            {
              rating,
              comment,
            }
          );

        toast.success(
          response.data.message
        );

        setComment("");

        setRating(5);

        fetchReviews();
        fetchCourse();
      } catch (error) {
        toast.error(
          error?.response?.data
            ?.errors ||
            "Unable to add review"
        );
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Course not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <img
            src={
              course.image?.url
            }
            alt={course.title}
            className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {course.title}
          </h1>

          <p className="text-gray-600 mt-5 leading-relaxed">
            {
              course.description
            }
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center">
              {[...Array(5)].map(
                (_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index <
                      Math.round(
                        course.averageRating ||
                          0
                      )
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                )
              )}
            </div>

            <span className="font-medium">
              {course.averageRating ||
                0}
            </span>

            <span className="text-gray-500">
              (
              {course.totalRatings ||
                0}{" "}
              reviews)
            </span>
          </div>

          <div className="mt-5">
            <p className="text-lg text-gray-600">
              Instructor
            </p>

            <p className="font-semibold text-xl">
              {
                course.instructor
              }
            </p>
          </div>

          <div className="mt-8">
            <span className="text-4xl font-bold text-indigo-600">
              ₹
              {
                course.price
              }
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={
                addToCart
              }
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
            >
              <ShoppingCart size={18} />
              Add To Cart
            </button>

            <button
              onClick={
                buyNow
              }
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-50"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-3xl font-bold mb-6">
          Student Reviews
        </h2>

        <form
          onSubmit={
            submitReview
          }
          className="bg-white shadow rounded-xl p-6 mb-8"
        >
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Rating
            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(
                  Number(
                    e.target.value
                  )
                )
              }
              className="border rounded-lg px-4 py-2 w-full"
            >
              <option value={5}>
                5
              </option>
              <option value={4}>
                4
              </option>
              <option value={3}>
                3
              </option>
              <option value={2}>
                2
              </option>
              <option value={1}>
                1
              </option>
            </select>
          </div>

          <textarea
            rows={4}
            placeholder="Write your review..."
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg"
          >
            Submit Review
          </button>
        </form>

        <div className="space-y-4">
          {reviews.length ===
          0 ? (
            <div className="text-gray-500">
              No reviews yet.
            </div>
          ) : (
            reviews.map(
              (review) => (
                <div
                  key={
                    review._id
                  }
                  className="bg-white shadow rounded-xl p-5"
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">
                      {
                        review
                          .userId
                          ?.firstName
                      }{" "}
                      {
                        review
                          .userId
                          ?.lastName
                      }
                    </h3>

                    <span>
                      ⭐{" "}
                      {
                        review.rating
                      }
                    </span>
                  </div>

                  <p className="mt-2 text-gray-600">
                    {
                      review.comment
                    }
                  </p>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Coursedetail;