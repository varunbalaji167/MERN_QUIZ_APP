// src/pages/ShareQuiz.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ShareQuiz = () => {
  const { quizId, userId } = useParams();
  const navigate = useNavigate();

  const path = `${window.location.origin}/quiz/${quizId}`;

  const handleShare = () => {
    navigator.clipboard
      .writeText(path)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text:", error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-teal-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative flex flex-col items-center">
        <button
          onClick={() => navigate(`/analytics/${userId}`)}
          className="absolute top-4 right-4 text-3xl font-bold text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Congrats, your Quiz is Published!
        </h2>
        <input
          className="border border-gray-300 rounded-lg p-3 w-full text-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={path}
          disabled
          type="text"
        />
        <button
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          onClick={handleShare}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default ShareQuiz;
