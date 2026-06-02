import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Plus,
  Trash2,
  FileText,
  Video,
  ArrowLeft,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/axios";

const AdminCourseLectures = () => {
  const { courseId } =
    useParams();

  const navigate =
    useNavigate();

  const [lectures, setLectures] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    createMode,
    setCreateMode,
  ] = useState(false);

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [order, setOrder] =
    useState("");

  const [video, setVideo] =
    useState(null);

  const [notes, setNotes] =
    useState(null);

  const fetchLectures =
    async () => {
      try {
        const response =
          await api.get(
            `/lecture/admin/course/${courseId}`
          );

        setLectures(
          response.data
            .lectures || []
        );
      } catch (error) {
        toast.error(
          "Failed to fetch lectures"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchLectures();
  }, []);

  const handleCreateLecture =
    async (
      e
    ) => {
      e.preventDefault();

      if (
        !title ||
        !order ||
        !video ||
        !notes
      ) {
        return toast.error(
          "Please fill all required fields"
        );
      }

      try {
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
          "order",
          order
        );

        formData.append(
          "video",
          video
        );

        formData.append(
          "notes",
          notes
        );

        const response =
          await api.post(
            `/lecture/create/${courseId}`,
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

        setTitle("");
        setDescription("");
        setOrder("");
        setVideo(null);
        setNotes(null);

        setCreateMode(
          false
        );

        fetchLectures();
      } catch (error) {
        toast.error(
          error?.response
            ?.data?.errors ||
            "Failed to create lecture"
        );
      }
    };

  const handleDelete =
    async (
      lectureId
    ) => {
      const confirmDelete =
        window.confirm(
          "Delete this lecture?"
        );

      if (
        !confirmDelete
      )
        return;

      try {
        const response =
          await api.delete(
            `/lecture/delete/${lectureId}`
          );

        toast.success(
          response.data
            .message
        );

        setLectures(
          lectures.filter(
            (
              lecture
            ) =>
              lecture._id !==
              lectureId
          )
        );
      } catch (error) {
        toast.error(
          error?.response
            ?.data?.errors ||
            "Failed to delete lecture"
        );
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading lectures...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={() =>
                navigate(
                  "/admin/our-courses"
                )
              }
              className="flex items-center gap-2 text-gray-600 mb-3"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h1 className="text-4xl font-bold">
              Course Lectures
            </h1>
          </div>

          <button
            onClick={() =>
              setCreateMode(
                !createMode
              )
            }
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl"
          >
            <Plus size={18} />
            Add Lecture
          </button>
        </div>

        {createMode && (
          <form
            onSubmit={
              handleCreateLecture
            }
            className="bg-white p-6 rounded-2xl shadow mb-8"
          >
            <h2 className="text-xl font-semibold mb-5">
              Create Lecture
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                placeholder="Lecture Title"
                value={title}
                onChange={(
                  e
                ) =>
                  setTitle(
                    e.target
                      .value
                  )
                }
                className="border p-3 rounded-xl"
              />

              <input
                type="number"
                placeholder="Order"
                value={order}
                onChange={(
                  e
                ) =>
                  setOrder(
                    e.target
                      .value
                  )
                }
                className="border p-3 rounded-xl"
              />

              <textarea
                placeholder="Description"
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
                className="border p-3 rounded-xl md:col-span-2"
                rows="4"
              />

              <div>
                <label className="font-medium block mb-2">
                  Video
                </label>

                <input
                  type="file"
                  accept="video/*"
                  onChange={(
                    e
                  ) =>
                    setVideo(
                      e.target
                        .files[0]
                    )
                  }
                />
              </div>

              <div>
                <label className="font-medium block mb-2">
                  Notes PDF
                </label>

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(
                    e
                  ) =>
                    setNotes(
                      e.target
                        .files[0]
                    )
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
            >
              Create Lecture
            </button>
          </form>
        )}

        <div className="space-y-5">
          {lectures.map(
            (
              lecture
            ) => (
              <div
                key={
                  lecture._id
                }
                className="bg-white rounded-2xl shadow p-5"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h2 className="text-xl font-semibold">
                      {
                        lecture.order
                      }
                      .
                      {" "}
                      {
                        lecture.title
                      }
                    </h2>

                    <p className="text-gray-600 mt-2">
                      {
                        lecture.description
                      }
                    </p>

                    <div className="flex gap-6 mt-4">

                      <a
                        href={
                          lecture
                            .video
                            ?.url
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-indigo-600"
                      >
                        <Video size={18} />
                        Video
                      </a>

                      <a
                        href={
                          lecture
                            .notes
                            ?.url
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-green-600"
                      >
                        <FileText size={18} />
                        Notes
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        lecture._id
                      )
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCourseLectures;