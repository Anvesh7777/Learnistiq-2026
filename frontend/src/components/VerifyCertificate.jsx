import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] =
    useState("");

  const navigate =
    useNavigate();

  const handleVerify = (
    e
  ) => {
    e.preventDefault();

    if (
      !certificateId.trim()
    )
      return;

    navigate(
      `/verify/${certificateId}`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-3">
          Verify Certificate
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter your certificate ID
        </p>

        <form
          onSubmit={
            handleVerify
          }
        >
          <input
            type="text"
            placeholder="LSTQ-XXXXXXX"
            value={
              certificateId
            }
            onChange={(e) =>
              setCertificateId(
                e.target.value
              )
            }
            className="w-full border rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Verify Certificate
          </button>
        </form>

      </div>

    </div>
  );
};

export default VerifyCertificate;