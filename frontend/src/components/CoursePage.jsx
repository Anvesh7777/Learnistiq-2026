import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/course/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!course) return <div className="text-center p-8">Loading course...</div>;

  return (
    <div className="min-h-screen bg-white p-6 md:ml-64">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-4">{course.title}</h1>
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              src={course.videoUrl}
              title={course.title}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>


        <div className="bg-gray-100 rounded-lg p-6 mb-8 shadow">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Lecture Summary</h2>
          <p className="text-gray-700 leading-relaxed">{course.summary}</p>
        </div>


        <div className="bg-gray-100 rounded-lg p-6 mb-8 shadow">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Student Comments</h2>
          <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet. Be the first!</p>
            ) : (
              comments.map((comment, idx) => (
                <div key={idx} className="bg-white p-3 rounded shadow text-gray-800">
                  {comment}
                </div>
              ))
            )}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow rounded-l-full px-4 py-2 border border-gray-400 focus:outline-none"
              placeholder="Add a comment..."
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-indigo-600 text-white px-4 rounded-r-full hover:bg-indigo-700"
            >
              <FiSend />
            </button>
          </div>
        </div>


        <div className="bg-gray-100 rounded-lg p-6 shadow">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Quick Quiz</h2>
          <ul className="space-y-4">
            {course.quiz?.map((q, i) => (
              <li key={i}>
                <p className="font-medium">{q.question}</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      className="bg-white border text-left px-4 py-2 rounded hover:bg-indigo-100"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;


