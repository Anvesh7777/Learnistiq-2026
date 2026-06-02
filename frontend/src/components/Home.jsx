import React, {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

import HeroSection from "./home/HeroSection";
import PopularCourses from "./home/PopularCourses";
import LearnersViewing from "./home/LearnersViewing";
import Testimonials from "./home/Testimonials";
import FAQ from "./home/FAQ";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [courses, setCourses] =
    useState([]);

  const [isLoggedIn] =
    useState(
      !!localStorage.getItem(
        "user"
      )
    );

  useEffect(() => {
    const fetchCourses =
      async () => {
        try {
          const response =
            await api.get(
              "/course/courses"
            );

          setCourses(
            response.data
              .courses || []
          );
        } catch (error) {
          console.log(
            error
          );
        }
      };

    fetchCourses();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        <HeroSection
          isLoggedIn={
            isLoggedIn
          }
        />

        <PopularCourses
          courses={courses}
        />

        <LearnersViewing
          courses={courses}
          settings={settings}
        />

        <Testimonials />

        <FAQ />

      </main>

      <Footer />
    </>
  );
};

export default Home;