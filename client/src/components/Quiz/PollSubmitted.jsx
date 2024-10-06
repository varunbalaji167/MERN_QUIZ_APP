// src/components/Quiz/PollSubmitted.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PollSubmitted = ({ userId, setIsAnalytics }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    setIsAnalytics(true);
    navigate(`/analytics/${userId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 bg-gray-50">
      <h1 className="text-4xl font-semibold mb-6 text-blue-600">
        Thank you for participating in the Poll
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        Your responses have been recorded. Click the button below to view your
        analytics.
      </p>
      <button
        onClick={handleRedirect}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        aria-label="Go to Analytics"
      >
        Go to Analytics
      </button>
    </div>
  );
};

// Define prop types
PollSubmitted.propTypes = {
  userId: PropTypes.string.isRequired,
  setIsAnalytics: PropTypes.func.isRequired,
};

export default PollSubmitted;
