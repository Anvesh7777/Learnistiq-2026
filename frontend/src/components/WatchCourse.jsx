import React, {
  useEffect,
  useState,
} from "react";

import {
  CheckCircle,
  Download,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../api/axios";

import Navbar from "./common/Navbar";

const WatchCourse = () => {
  const { courseId } =
    useParams();

  const navigate =
    useNavigate();

  const [lectures, setLectures] =
    useState([]);

  const [
    selectedLecture,
    setSelectedLecture,
  ] = useState(null);

  const [progress, setProgress] =
    useState({
      progressPercentage: 0,
      completedLectures: [],
      isCourseCompleted: false,
    });

  const [loading, setLoading] =
    useState(true);

  const fetchLectures =
    async () => {
      try {
        const response =
          await api.get(
            `/lecture/course/${courseId}`
          );

        const lectureList =
          response.data
            .lectures || [];

        setLectures(
          lectureList
        );

        if (
          lectureList.length > 0
        ) {
          setSelectedLecture(
            lectureList[0]
          );
        }
      } catch (error) {
        toast.error(
          error?.response?.data
            ?.errors ||
            "Unable to load lectures"
        );

        navigate(
          "/purchases"
        );
      }
    };

  const fetchProgress =
    async () => {
      try {
        const response =
          await api.get(
            `/progress/course/${courseId}`
          );

        if (
          response.data
            .progress
        ) {
          setProgress(
            response.data
              .progress
          );
        }
      } catch (error) {
        console.log(
          error
        );
      }
    };

  useEffect(() => {
    const loadData =
      async () => {
        setLoading(true);

        await Promise.all([
          fetchLectures(),
          fetchProgress(),
        ]);

        setLoading(false);
      };

    loadData();
  }, [courseId]);

  const markComplete =
    async (
      lectureId
    ) => {
      try {
        const response =
          await api.post(
            "/progress/complete",
            {
              courseId,
              lectureId,
            }
          );

        setProgress(
          response.data
            .progress
        );

        toast.success(
          "Lecture completed"
        );
      } catch (error) {
        toast.error(
          error?.response?.data
            ?.errors ||
            "Unable to update progress"
        );
      }
    };

  const currentIndex =
    lectures.findIndex(
      (lecture) =>
        lecture._id ===
        selectedLecture?._id
    );

  const nextLecture =
    () => {
      if (
        currentIndex <
        lectures.length - 1
      ) {
        setSelectedLecture(
          lectures[
            currentIndex + 1
          ]
        );
      }
    };

  const previousLecture =
    () => {
      if (
        currentIndex > 0
      ) {
        setSelectedLecture(
          lectures[
            currentIndex - 1
          ]
        );
      }
    };

  const isCompleted =
    (
      lectureId
    ) =>
      progress.completedLectures?.some(
        (id) =>
          id ===
            lectureId ||
          id?._id ===
            lectureId
      );

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

            <p className="text-lg font-medium">
              Loading course...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">

        <div className="grid lg:grid-cols-4">

          {/* Sidebar */}

          <div className="bg-white border-r h-screen overflow-y-auto">

            <div className="p-5 border-b">

              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-indigo-600" />

                <h2 className="text-xl font-bold">
                  Course Content
                </h2>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${progress.progressPercentage || 0}%`,
                  }}
                />
              </div>

              <p className="text-sm text-gray-600 mt-2">
                {
                  progress.progressPercentage
                }
                % Complete
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {
                  progress
                    .completedLectures
                    ?.length || 0
                }
                /{lectures.length}
                {" "}
                lectures completed
              </p>

            </div>

            {lectures.map(
              (lecture) => (
                <button
                  key={
                    lecture._id
                  }
                  onClick={() =>
                    setSelectedLecture(
                      lecture
                    )
                  }
                  className={`w-full text-left p-4 border-b hover:bg-gray-50 transition ${
                    selectedLecture?._id ===
                    lecture._id
                      ? "bg-indigo-50"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-center">

                    <div>
                      <p className="font-medium">
                        {
                          lecture.title
                        }
                      </p>

                      <p className="text-xs text-gray-500">
                        {
                          lecture.duration
                        }{" "}
                        min
                      </p>
                    </div>

                    {isCompleted(
                      lecture._id
                    ) && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}

                  </div>
                </button>
              )
            )}

          </div>

          {/* Main */}

          <div className="lg:col-span-3 p-6">

            {selectedLecture ? (
              <>
                <div className="bg-black rounded-2xl overflow-hidden shadow">

                  <video
                    key={
                      selectedLecture._id
                    }
                    controls
                    className="w-full"
                  >
                    <source
                      src={
                        selectedLecture
                          .video?.url
                      }
                      type="video/mp4"
                    />
                  </video>

                </div>

                <div className="bg-white mt-6 rounded-2xl p-6 shadow">

                  <div className="flex flex-col md:flex-row justify-between gap-4">

                    <div>
                      <h1 className="text-3xl font-bold">
                        {
                          selectedLecture.title
                        }
                      </h1>

                      <p className="text-gray-600 mt-3">
                        {
                          selectedLecture.description
                        }
                      </p>
                    </div>

                    <a
                      href={
                        selectedLecture
                          .notes?.url
                      }
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl"
                    >
                      <Download size={18} />
                      Download Notes
                    </a>

                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">

                    <button
                      onClick={
                        previousLecture
                      }
                      disabled={
                        currentIndex <=
                        0
                      }
                      className="flex items-center gap-2 border px-4 py-2 rounded-lg disabled:opacity-50"
                    >
                      <ChevronLeft size={18} />
                      Previous
                    </button>

                    <button
                      onClick={
                        nextLecture
                      }
                      disabled={
                        currentIndex ===
                        lectures.length -
                          1
                      }
                      className="flex items-center gap-2 border px-4 py-2 rounded-lg disabled:opacity-50"
                    >
                      Next
                      <ChevronRight size={18} />
                    </button>

                    {!isCompleted(
                      selectedLecture._id
                    ) && (
                      <button
                        onClick={() =>
                          markComplete(
                            selectedLecture._id
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                      >
                        Mark Complete
                      </button>
                    )}

                  </div>

                  {progress.isCourseCompleted && (
                    <div className="mt-8 bg-green-100 border border-green-300 text-green-700 p-5 rounded-xl">
                      <h3 className="font-semibold text-lg">
                        🎉 Course Completed
                      </h3>

                      <p className="mt-2">
                        Great work! You have
                        successfully completed
                        all lectures in this
                        course.
                      </p>
                    </div>
                  )}

                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[70vh]">
                <PlayCircle className="w-20 h-20 text-gray-400" />

                <p className="mt-4 text-gray-500">
                  No lecture available
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </>
  );
};

export default WatchCourse;