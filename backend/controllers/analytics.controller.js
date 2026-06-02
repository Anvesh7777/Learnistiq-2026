import { User } from "../models/user.model.js";
import { Course } from "../models/course.model.js";
import { Purchase } from "../models/purchase.model.js";
import { Progress } from "../models/progress.model.js";

export const getAnalytics = async (
  req,
  res
) => {
  try {
    const totalStudents =
      await User.countDocuments();

    const totalCourses =
      await Course.countDocuments();

    const totalEnrollments =
      await Purchase.countDocuments({
        status: "success",
      });

    const revenueData =
      await Purchase.aggregate([
        {
          $match: {
            status: "success",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$amount",
            },
          },
        },
      ]);

    const totalRevenue =
      revenueData.length > 0
        ? revenueData[0].totalRevenue
        : 0;

    const completedCourses =
  await Progress.countDocuments({
    isCourseCompleted: true,
  });

    return res.status(200).json({
      success: true,
      analytics: {
        totalStudents,
        totalCourses,
        totalEnrollments,
        totalRevenue,
        completedCourses,
      },
    });
  } catch (error) {
    console.log(
      "Analytics error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error fetching analytics",
    });
  }
};