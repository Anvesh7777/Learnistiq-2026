import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Upload,
  BookOpen,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

const CourseCreate = () => {
  const navigate =
    useNavigate();

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [price, setPrice] =
    useState("");

  const [
    instructor,
    setInstructor,
  ] = useState("");

  const [image, setImage] =
    useState(null);

  const [
    imagePreview,
    setImagePreview,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const changePhotoHandler =
    (e) => {
      const file =
        e.target.files[0];

      if (!file) return;

      setImage(file);

      const reader =
        new FileReader();

      reader.readAsDataURL(
        file
      );

      reader.onload =
        () => {
          setImagePreview(
            reader.result
          );
        };
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        !title ||
        !description ||
        !price ||
        !image
      ) {
        return toast.error(
          "Please fill all required fields"
        );
      }

      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        formData.append(
          "description",
          description
        );

        formData.append(
          "price",
          price
        );

        formData.append(
          "instructor",
          instructor
        );

        formData.append(
          "image",
          image
        );

        const response =
          await api.post(
            "/course/create",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        toast.success(
          response.data
            .message
        );

        navigate(
          "/admin/our-courses"
        );
      } catch (error) {
        toast.error(
          error?.response
            ?.data?.errors ||
            "Failed to create course"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-5xl mx-auto px-6 py-8">

        <button
          onClick={() =>
            navigate(
              "/admin/our-courses"
            )
          }
          className="flex items-center gap-2 text-gray-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <div className="bg-indigo-600 p-8 text-white">

            <div className="flex items-center gap-3">
              <BookOpen />
              <h1 className="text-3xl font-bold">
                Create New Course
              </h1>
            </div>

            <p className="mt-2 text-indigo-100">
              Build your next
              learning experience.
            </p>
          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="p-8"
          >

            <div className="grid md:grid-cols-2 gap-8">

              <div className="space-y-5">

                <div>
                  <label className="block mb-2 font-medium">
                    Course Title
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(
                      e
                    ) =>
                      setTitle(
                        e.target
                          .value
                      )
                    }
                    className="w-full border rounded-xl p-3"
                    placeholder="MERN Stack Mastery"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Instructor
                  </label>

                  <input
                    type="text"
                    value={
                      instructor
                    }
                    onChange={(
                      e
                    ) =>
                      setInstructor(
                        e.target
                          .value
                      )
                    }
                    className="w-full border rounded-xl p-3"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Price (₹)
                  </label>

                  <input
                    type="number"
                    value={price}
                    onChange={(
                      e
                    ) =>
                      setPrice(
                        e.target
                          .value
                      )
                    }
                    className="w-full border rounded-xl p-3"
                    placeholder="999"
                  />
                </div>

              </div>

              <div>

                <label className="block mb-2 font-medium">
                  Course Thumbnail
                </label>

                <div className="border-2 border-dashed rounded-2xl p-6">

                  {imagePreview ? (
                    <img
                      src={
                        imagePreview
                      }
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-gray-500">
                      <Upload size={40} />
                      <p className="mt-3">
                        Upload Course Image
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      changePhotoHandler
                    }
                    className="mt-4 w-full"
                  />
                </div>

              </div>

            </div>

            <div className="mt-8">

              <label className="block mb-2 font-medium">
                Description
              </label>

              <textarea
                rows="6"
                value={
                  description
                }
                onChange={(
                  e
                ) =>
                  setDescription(
                    e.target
                      .value
                  )
                }
                className="w-full border rounded-xl p-4"
                placeholder="Describe your course..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-4 rounded-xl font-semibold"
            >
              {loading
                ? "Creating Course..."
                : "Create Course"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseCreate;