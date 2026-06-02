import instance from "../utils/razorpay.js";
import { User } from "../models/user.model.js";
import { Purchase } from "../models/purchase.model.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import { Course } from "../models/course.model.js";
import {
  getEnrollmentTemplate,
} from "../utils/emailTemplates.js";

// CHECKOUT CONTROLLER
export const checkout = async (
  req,
  res
) => {
  try {
    const { userId } = req;

    const { courseIds } =
      req.body;

    if (
      !courseIds ||
      !Array.isArray(
        courseIds
      ) ||
      courseIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Course IDs are required",
      });
    }

    const user =
      await User.findById(
        userId
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        error:
          "User not found",
      });
    }

    const courses =
      await Course.find({
        _id: {
          $in: courseIds,
        },
      });

    if (
      courses.length !==
      courseIds.length
    ) {
      return res.status(400).json({
        success: false,
        error:
          "One or more courses not found",
      });
    }

    // Prevent repurchase

    const existingPurchases =
      await Purchase.find({
        userId,
        courseId: {
          $in: courseIds,
        },
        status: "success",
      });

    if (
      existingPurchases.length > 0
    ) {
      const purchasedCourseIds =
        existingPurchases.map(
          (purchase) =>
            purchase.courseId.toString()
        );

      const purchasedCourses =
        courses
          .filter((course) =>
            purchasedCourseIds.includes(
              course._id.toString()
            )
          )
          .map(
            (course) =>
              course.title
          );

      return res.status(400).json({
        success: false,
        error: `Already purchased: ${purchasedCourses.join(
          ", "
        )}`,
      });
    }

    const totalAmount =
      courses.reduce(
        (sum, course) =>
          sum +
          course.price,
        0
      );

    const order =
      await instance.orders.create({
        amount:
          totalAmount *
          100,
        currency: "INR",

        notes: {
          userId:
            user._id.toString(),

          courseIds:
            JSON.stringify(
              courseIds
            ),
        },
      });

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(
      "Checkout error:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        "Error creating order",
    });
  }
};
// VERIFY PAYMENT CONTROLLER
export const verifyPayment = async (
  req,
  res
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const { userId } = req;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing payment details",
      });
    }

    const body =
      `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature =
  crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_API_SECRET
    )
    .update(body)
    .digest("hex");

    if (
      expectedSignature !==
      razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid signature",
      });
    }

    const user =
      await User.findById(
        userId
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    const order =
      await instance.orders.fetch(
        razorpay_order_id
      );

    const courseIds =
      JSON.parse(
        order.notes.courseIds
      );

    const courses =
      await Course.find({
        _id: {
          $in: courseIds,
        },
      });

    if (
      courses.length === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          "No courses found",
      });
    }

    const enrolledCourses =
      [];

    for (const course of courses) {
      const existingPurchase =
        await Purchase.findOne({
          userId:
            user._id,
          courseId:
            course._id,
        });

      if (
        existingPurchase
      ) {
        continue;
      }

     await Purchase.create({
  userId: user._id,
  courseId: course._id,

  amount: course.price,

  paymentId: razorpay_payment_id,
  orderId: razorpay_order_id,
  signature: razorpay_signature,

  verified: true,
  status: "success",
});

      const alreadyPurchased =
        user.purchasedCourses.some(
          (id) =>
            id.toString() ===
            course._id.toString()
        );

      if (
        !alreadyPurchased
      ) {
        user.purchasedCourses.push(
          course._id
        );
      }

      enrolledCourses.push(
        course.title
      );
    }

    await user.save();

    try {
      const courseList =
        enrolledCourses
          .map(
            (
              course
            ) =>
              `<li>${course}</li>`
          )
          .join("");

     await sendEmail(
  user.email,
  "Course Enrollment Successful 🎉",
  getEnrollmentTemplate(
    user.firstName,
    enrolledCourses
      .map(
        (course) =>
          `<li>${course}</li>`
      )
      .join("")
  )
);
    } catch (
      emailError
    ) {
      console.log(
        "Enrollment email error:",
        emailError.message
      );
    }

    return res.status(200).json({
      success: true,
      message:
        "Payment verified successfully",
      enrolledCourses,
    });
  } catch (error) {
    console.error(
      "Verify payment error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
};



export const fallbackPurchase = async (req, res) => {
  const {
    email,
    courses,
    payment_id,
    order_id,
    signature,
    status,
  } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    for (const course of courses) {
      const courseData =
        await Course.findById(
          course._id
        );

      if (!courseData) {
        continue;
      }

      const existingPurchase =
        await Purchase.findOne({
          userId: user._id,
          courseId: course._id,
        });

      if (!existingPurchase) {
        await Purchase.create({
          userId: user._id,
          courseId: course._id,
          amount: courseData.price,
          paymentId: payment_id,
          orderId: order_id,
          signature: signature,
          verified: false,
          fallback: true,
          status:
            status || "success",
        });

        const alreadyPurchased =
          user.purchasedCourses.some(
            (id) =>
              id.toString() ===
              course._id.toString()
          );

        if (!alreadyPurchased) {
          user.purchasedCourses.push(
            course._id
          );
        }
      }
    }

    await user.save();

    return res.status(200).json({
      message:
        "Fallback purchase recorded.",
    });
  } catch (err) {
    console.error(
      "Fallback error:",
      err
    );

    return res.status(500).json({
      message:
        "Could not record fallback purchase.",
    });
  }
};
