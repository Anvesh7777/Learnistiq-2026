import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  BookOpen,
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate =
    useNavigate();

  const {
    user,
    logout,
    isAuthenticated,
  } = useAuth();

  const [isOpen, setIsOpen] =
    useState(false);

  const [showMenu, setShowMenu] =
    useState(false);

  const admin = JSON.parse(
    localStorage.getItem("admin") ||
      "null"
  );

  const cart =
    JSON.parse(
      localStorage.getItem(
        "cart"
      ) || "[]"
    );

  const handleLogout =
    async () => {
      try {
        await api.get(
          "/user/logout"
        );

        logout();

        toast.success(
          "Logged out successfully"
        );

        navigate("/");
      } catch (error) {
        toast.error(
          error?.response?.data
            ?.errors ||
            "Logout failed"
        );
      }
    };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <BookOpen className="h-8 w-8 text-indigo-600" />

            <span className="text-2xl font-bold text-gray-900">
              Learnistiq
            </span>
          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Home
            </Link>

            <Link
              to="/courses"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Courses
              </Link>
                      
              <Link
  to="/verify"
 className="text-gray-700 hover:text-indigo-600 font-medium"
>
  Verify Certificate
</Link>        

            {isAuthenticated && (
              <>
                <Link
                  to="/purchases"
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  My Learning
                </Link>

                <Link
                  to="/cart"
                  className="relative"
                >
                  <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-indigo-600" />

                  {cart.length >
                    0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                      {
                        cart.length
                      }
                    </span>
                  )}
                </Link>
              </>
            )}

            {admin && (
              <Link
                to="/admin/dashboard"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                Admin
              </Link>
            )}

            {!isAuthenticated ? (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="relative">

                <button
                  onClick={() =>
                    setShowMenu(
                      !showMenu
                    )
                  }
                  className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
                >
                  <User className="h-5 w-5" />

                  <span>
                    {user?.user
                      ?.firstName ||
                      "User"}
                  </span>
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-xl border overflow-hidden">

                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/purchases"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      My Courses
                    </Link>

                    <button
                      onClick={
                        handleLogout
                      }
                      className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>

                  </div>
                )}

              </div>
            )}

          </div>

          {/* Mobile Button */}

          <button
            onClick={() =>
              setIsOpen(
                !isOpen
              )
            }
            className="md:hidden"
          >
            {isOpen ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>

        </div>

        {/* Mobile Menu */}

        {isOpen && (
          <div className="md:hidden py-4 space-y-3">

            <Link
              to="/"
              className="block"
            >
              Home
            </Link>

            <Link
              to="/courses"
              className="block"
            >
              Courses
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/purchases"
                  className="block"
                >
                  My Learning
                </Link>

                <Link
                  to="/cart"
                  className="block"
                >
                  Cart
                </Link>

                <Link
                  to="/profile"
                  className="block"
                >
                  Profile
                </Link>
              </>
            )}

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="block"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="block"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={
                  handleLogout
                }
                className="text-red-600"
              >
                Logout
              </button>
            )}

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;