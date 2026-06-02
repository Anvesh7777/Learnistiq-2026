import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const LearnersViewing = ({
  courses,
  settings,
}) => {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-10">
        Learners Are Viewing
      </h2>

      <Slider {...settings}>
        {courses
          .slice(0, 6)
          .map((course) => (
            <Link
              key={course._id}
              to={`/course/${course._id}`}
              className="p-3"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition">
                <img
                  src={course.image?.url}
                  alt={course.title}
                  className="h-44 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold">
                    {course.title}
                  </h3>

                  <p className="text-indigo-600 font-bold mt-2">
                    ₹{course.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </Slider>
    </section>
  );
};

export default LearnersViewing;