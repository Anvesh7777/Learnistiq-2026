import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const HeroSection = ({
  isLoggedIn,
}) => {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
        Unlock Your Potential:
        Learn{" "}
        <span className="text-indigo-600">
          <Typewriter
            words={[
              "Development",
              "Business",
              "Design",
              "Marketing",
              "Finance",
              "IT & Software",
            ]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={90}
            deleteSpeed={90}
            delaySpeed={2000}
          />
        </span>
      </h1>

      <p className="text-xl font-semibold text-gray-600 mx-4 mt-6">
        Join thousands of learners and
        gain the skills you need to
        succeed in today's competitive
        world.
      </p>

      <div className="flex justify-center space-x-4 mt-8">
        <Link
          to="/courses"
          className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700"
        >
          Browse Courses
        </Link>

        {!isLoggedIn && (
          <Link
            to="/signup"
            className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-50"
          >
            Get Started
          </Link>
        )}
      </div>
    </section>
  );
};

export default HeroSection;