// src/pages/AttemptQuiz.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AttemptQuiz = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [quizUrl, setQuizUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (quizUrl) {
      window.location.href = quizUrl;
    } else {
      alert("Please enter a valid URL."); // Alert if the URL is empty
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-purple-500 to-teal-400">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        Attempt Quiz
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
      >
        <div className="mb-6">
          <label
            htmlFor="quiz-url"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Paste the Quiz URL:
          </label>
          <input
            type="url"
            id="quiz-url"
            value={quizUrl}
            onChange={(e) => setQuizUrl(e.target.value)}
            className="shadow-md border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="https://example.com/quiz"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(`/analytics/${userId}`)}
            className="py-3 px-4 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttemptQuiz;
