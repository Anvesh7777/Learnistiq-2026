import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Courses from "./components/Courses.jsx";
import Buy from "./components/Buy.jsx";
import Purchases from "./components/Purchases.jsx";
import Profile from "./components/Profile.jsx";
import Cart from "./components/Cart.jsx";
import Coursedetail from "./components/Coursedetail.jsx";
import PaymentSuccess from "./components/PaymentSuccess.jsx";
import WatchCourse from "./components/WatchCourse.jsx";

import AdminSignup from "./admin/AdminSignup.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import CourseCreate from "./admin/CourseCreate.jsx";
import UpdateCourse from "./admin/UpdateCourse.jsx";
import OurCourses from "./admin/OurCourses.jsx";
import AdminCourseLectures from "./admin/AdminCourseLectures.jsx";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import CertificateVerification from "./components/CertificateVerification";
import VerifyCertificate from "./components/VerifyCertificate";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const App = () => {
  const admin = JSON.parse(
    localStorage.getItem("admin") ||
      "null"
  );

  return (
    <>
      <Routes>
        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/courses"
          element={<Courses />}
        />

        <Route
          path="/course/:id"
          element={<Coursedetail />}
        />

        {/* Protected User Routes */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buy/:courseId"
          element={
            <ProtectedRoute>
              <Buy />
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchases"
          element={
            <ProtectedRoute>
              <Purchases />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment-success"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/watch-course/:courseId"
          element={
            <ProtectedRoute>
              <WatchCourse />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}

        <Route
          path="/admin/signup"
          element={<AdminSignup />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={
            admin ? (
              <Dashboard />
            ) : (
              <AdminLogin />
            )
          }
        />

        <Route
          path="/admin/create-course"
          element={
            admin ? (
              <CourseCreate />
            ) : (
              <AdminLogin />
            )
          }
        />

        <Route
          path="/admin/update-course/:id"
          element={
            admin ? (
              <UpdateCourse />
            ) : (
              <AdminLogin />
            )
          }
        />

        <Route
          path="/admin/our-courses"
          element={
            admin ? (
              <OurCourses />
            ) : (
              <AdminLogin />
            )
          }
        />

        <Route
          path="/admin/course/:courseId/lectures"
          element={
            admin ? (
              <AdminCourseLectures />
            ) : (
              <AdminLogin />
            )
          }
        />

        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
        />
        <Route
  path="/verify/:certificateId"
  element={
    <CertificateVerification />
  }
        />
        <Route
  path="/verify"
  element={
    <VerifyCertificate />
  }
/>

<Route
  path="/verify/:certificateId"
  element={
    <CertificateVerification />
  }
/>
      </Routes>

      <Toaster position="top-right" />
    </>
  );
};

export default App;