import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const CourseCard = ({
  course,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300">
      <img
        src={
          course?.image?.url
        }
        alt={course?.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-semibold line-clamp-2">
          {course?.title}
        </h2>

        <p className="text-gray-600 mt-3 line-clamp-3">
          {
            course?.description
          }
        </p>

        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Instructor
          </p>

          <p className="font-medium">
            {course?.instructor ||
              "Learnistiq"}
          </p>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

            <span className="font-medium">
              {course?.averageRating ||
                0}
            </span>

            <span className="text-sm text-gray-500">
              (
              {course?.totalRatings ||
                0}
              )
            </span>
          </div>

          <span className="text-xl font-bold text-indigo-600">
            ₹
            {course?.price}
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
  );
};

export default CourseCard;