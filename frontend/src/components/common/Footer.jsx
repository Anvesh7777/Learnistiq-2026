import React from "react";

import {
  Link,
} from "react-router-dom";

import {
  BookOpen,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

const Footer = () => {
  const currentYear =
    new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}

          <div>
            <div className="flex items-center gap-2 mb-4">

              <BookOpen className="h-8 w-8 text-indigo-500" />

              <span className="text-2xl font-bold text-white">
                Learnistiq
              </span>

            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              Learn, grow and build your
              future with industry-ready
              courses, practical projects
              and real-world learning.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/"
                className="hover:text-indigo-400 transition"
              >
                Home
              </Link>

              <Link
                to="/courses"
                className="hover:text-indigo-400 transition"
              >
                Courses
              </Link>

              <Link
                to="/purchases"
                className="hover:text-indigo-400 transition"
              >
                My Learning
              </Link>

              <Link
                to="/profile"
                className="hover:text-indigo-400 transition"
              >
                Profile
              </Link>

            </div>
          </div>

          {/* Platform */}

          <div>
            <h3 className="text-white font-semibold mb-4">
              Platform
            </h3>

            <div className="flex flex-col gap-3">

              <span>
                Course Enrollment
              </span>

              <span>
                Progress Tracking
              </span>

              <span>
                Digital Certificates
              </span>

              <span>
                Learning Dashboard
              </span>

            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-3">

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>
                  support@learnistiq.com
                </span>
              </div>

              <div className="flex gap-4 pt-2">

                <a
                  href="https://github.com/Anvesh7777"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-400 transition"
                >
                  <Github className="h-5 w-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/anvesh77/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-400 transition"
                >
                  <Linkedin className="h-5 w-5" />
                </a>

              </div>

            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">

          © {currentYear} Learnistiq.
          All rights reserved.

        </div>

      </div>

    </footer>
  );
};

export default Footer;