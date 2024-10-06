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
    <div className="rounded-lg shadow-lg p-8 max-w-md w-full text-center">
      <h1 className="text-3xl font-semibold mb-4 text-blue-600">
        Thank you for participating in the Poll
      </h1>
      <p className="text-lg text-gray-700 mb-6">
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
