import React from "react";
import CourseCard from "../common/CourseCard";

const PopularCourses = ({
  courses,
}) => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-8 text-gray-800">
          Popular Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map(
            (course) => (
              <CourseCard
                key={
                  course._id
                }
                course={course}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;