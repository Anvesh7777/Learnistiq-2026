import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import api from "../api/axios";

const CertificateVerification =
  () => {
    const {
      certificateId,
    } = useParams();

    const [data, setData] =
      useState(null);

    const [loading, setLoading] =
      useState(true);

    useEffect(() => {
      fetchCertificate();
    }, []);

    const fetchCertificate =
      async () => {
        try {
          const response =
            await api.get(
              `/progress/verify/${certificateId}`
            );

          setData(
            response.data.certificate
          );
        } catch {
          setData(null);
        } finally {
          setLoading(false);
        }
      };

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      );
    }

   if (!data) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white shadow-xl rounded-2xl p-10 text-center">

        <div className="text-5xl mb-4">
          ❌
        </div>

        <h1 className="text-3xl font-bold text-red-600">
          Invalid Certificate
        </h1>

        <p className="mt-3 text-gray-500">
          Certificate not found
        </p>

      </div>

    </div>
  );
}

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl w-full">

          <div className="text-center mb-8">

            <div className="text-5xl mb-4">
              ✅
            </div>

            <h1 className="text-3xl font-bold text-green-600">
              Certificate Verified
            </h1>

          </div>

          <div className="space-y-4">

            <p>
              <strong>
                Student:
              </strong>{" "}
              {
                data.studentName
              }
            </p>

            <p>
              <strong>
                Course:
              </strong>{" "}
              {
                data.courseTitle
              }
            </p>

            <p>
              <strong>
                Instructor:
              </strong>{" "}
              {
                data.instructor
              }
            </p>

            <p>
              <strong>
                Certificate ID:
              </strong>{" "}
              {
                data.certificateId
              }
            </p>

            <p>
              <strong>
                Completed:
              </strong>{" "}
              {new Date(
                data.completedAt
              ).toLocaleDateString()}
            </p>

          </div>

        </div>
      </div>
    );
  };

export default CertificateVerification;