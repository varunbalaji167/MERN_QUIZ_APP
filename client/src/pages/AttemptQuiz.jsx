// src/pages/AttemptQuiz.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AttemptQuiz = () => {
  const { userId } = useParams(); // Get userId from URL
  const [quizUrl, setQuizUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Redirect to the pasted URL if it's a valid URL
    if (quizUrl) {
      window.location.href = quizUrl; // Redirecting to the URL
    } else {
      alert("Please enter a valid URL."); // Alert if the URL is empty
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Attempt Quiz</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="quiz-url" className="block text-gray-700 text-sm font-bold mb-2">
            Paste the Quiz URL:
          </label>
          <input
            type="url"
            id="quiz-url"
            value={quizUrl}
            onChange={(e) => setQuizUrl(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="https://example.com/quiz"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AttemptQuiz;

