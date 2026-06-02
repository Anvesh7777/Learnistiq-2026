import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Upload,
  BookOpen,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

const UpdateCourse = () => {
  const { id } =
    useParams();

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
    useState(true);

  const [
    updating,
    setUpdating,
  ] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse =
    async () => {
      try {
        const response =
          await api.get(
            `/course/public/${id}`
          );

        const course =
          response.data
            .course;

        setTitle(
          course.title
        );

        setDescription(
          course.description
        );

        setPrice(
          course.price
        );

        setInstructor(
          course.instructor ||
            ""
        );

        setImagePreview(
          course.image?.url
        );
      } catch (error) {
        toast.error(
          "Failed to fetch course"
        );

        navigate(
          "/admin/our-courses"
        );
      } finally {
        setLoading(false);
      }
    };

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
        () =>
          setImagePreview(
            reader.result
          );
    };

  const handleUpdateCourse =
    async (e) => {
      e.preventDefault();

      try {
        setUpdating(true);

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

        if (image) {
          formData.append(
            "image",
            image
          );
        }

        const response =
          await api.put(
            `/course/update/${id}`,
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
            .message ||
            "Course updated successfully"
        );

        navigate(
          "/admin/our-courses"
        );
      } catch (error) {
        toast.error(
          error?.response
            ?.data?.errors ||
            "Failed to update course"
        );
      } finally {
        setUpdating(false);
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

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
                Update Course
              </h1>
            </div>

            <p className="mt-2 text-indigo-100">
              Update course details
              and thumbnail.
            </p>
          </div>

          <form
            onSubmit={
              handleUpdateCourse
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
                      alt="Course"
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
              />
            </div>

            <button
              type="submit"
              disabled={
                updating
              }
              className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-4 rounded-xl font-semibold"
            >
              {updating
                ? "Updating Course..."
                : "Update Course"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;