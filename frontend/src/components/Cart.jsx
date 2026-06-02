import React, {
  useEffect,
  useState,
} from "react";

import {
  Trash2,
  ShoppingCart,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  useNavigate,
} from "react-router-dom";

import api from "../api/axios";

const Cart = () => {
  const navigate =
    useNavigate();

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const cart =
      JSON.parse(
        localStorage.getItem(
          "cart"
        )
      ) || [];

    setCartItems(cart);
  }, []);

  const removeCourse =
    (courseId) => {
      const updatedCart =
        cartItems.filter(
          (course) =>
            course._id !==
            courseId
        );

      setCartItems(
        updatedCart
      );

      localStorage.setItem(
        "cart",
        JSON.stringify(
          updatedCart
        )
      );

      toast.success(
        "Course removed"
      );
    };

  const totalAmount =
    cartItems.reduce(
      (
        total,
        course
      ) =>
        total +
        Number(
          course.price
        ),
      0
    );

  const handleCheckout =
    async () => {
      try {
        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        if (!user?.token) {
          toast.error(
            "Please login first"
          );

          navigate(
            "/login"
          );

          return;
        }

        if (
          cartItems.length ===
          0
        ) {
          toast.error(
            "Cart is empty"
          );

          return;
        }

        setLoading(true);

        const checkoutResponse =
          await api.post(
            "/payment/checkout",
            {
              courseIds:
                cartItems.map(
                  (
                    course
                  ) =>
                    course._id
                ),
            }
          );

        const order =
          checkoutResponse
            .data.order;

        const options = {
          key:
            import.meta
              .env
              .VITE_RAZORPAY_KEY_ID,

          amount:
            order.amount,

          currency:
            order.currency,

          name:
            "Learnistiq",

          description:
            "Course Purchase",

          order_id:
            order.id,

          handler:
            async (
              response
            ) => {
              try {
                const verifyResponse =
                  await api.post(
                    "/payment/verify",
                    {
                      razorpay_order_id:
                        response.razorpay_order_id,

                      razorpay_payment_id:
                        response.razorpay_payment_id,

                      razorpay_signature:
                        response.razorpay_signature,
                    }
                  );

                localStorage.removeItem(
                  "cart"
                );

                setCartItems(
                  []
                );

                toast.success(
                  "Payment Successful"
                );

                navigate(
                  "/payment-success",
                  {
                    state:
                      {
                        enrolledCourses:
                          verifyResponse
                            .data
                            .enrolledCourses,
                      },
                  }
                );
              } catch (error) {
                console.log(
                  error
                );

                toast.error(
                  "Payment verification failed"
                );
              }
            },

          prefill: {
            name: `${user?.user?.firstName || ""} ${
              user?.user
                ?.lastName ||
              ""
            }`,

            email:
              user?.user
                ?.email ||
              "",
          },

          theme: {
            color:
              "#4F46E5",
          },
        };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.on(
          "payment.failed",
          (
            response
          ) => {
            console.log(
              response
            );

            toast.error(
              "Payment failed"
            );
          }
        );

        razorpay.open();
      } catch (error) {
        console.log(
          error
        );

        toast.error(
          error?.response
            ?.data?.error ||
            "Unable to initiate payment"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-10">
          <ShoppingCart className="w-8 h-8 text-indigo-600" />

          <h1 className="text-4xl font-bold">
            Shopping Cart
          </h1>
        </div>

        {cartItems.length ===
        0 ? (
          <div className="bg-white rounded-2xl p-10 shadow text-center">
            <h2 className="text-2xl font-semibold">
              Your Cart is Empty
            </h2>

            <p className="text-gray-500 mt-3">
              Explore courses
              and start
              learning.
            </p>

            <button
              onClick={() =>
                navigate(
                  "/courses"
                )
              }
              className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(
                (
                  course
                ) => (
                  <div
                    key={
                      course._id
                    }
                    className="bg-white rounded-2xl shadow p-5 flex gap-5"
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
                      className="w-40 h-28 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">
                        {
                          course.title
                        }
                      </h3>

                      <p className="text-gray-600 mt-2 line-clamp-2">
                        {
                          course.description
                        }
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-2xl font-bold text-indigo-600">
                          ₹
                          {
                            course.price
                          }
                        </span>

                        <button
                          onClick={() =>
                            removeCourse(
                              course._id
                            )
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="bg-white rounded-2xl shadow p-6 h-fit">
              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4">
                <span>
                  Courses
                </span>

                <span>
                  {
                    cartItems.length
                  }
                </span>
              </div>

              <div className="flex justify-between text-xl font-bold border-t pt-4">
                <span>
                  Total
                </span>

                <span>
                  ₹
                  {
                    totalAmount
                  }
                </span>
              </div>

              <button
                onClick={
                  handleCheckout
                }
                disabled={
                  loading
                }
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-xl font-medium"
              >
                {loading
                  ? "Processing..."
                  : "Proceed To Payment"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;