// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const PollSubmitted = ({ userId, setIsAnalytics }) => { // Accept userId and setIsAnalytics as props
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleRedirect = () => {
//     setIsAnalytics(true); // Set analytics state to true
//     navigate(`/analytics/${userId}`); // Redirect to the analytics page with userId
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen text-center p-4">
//       <h1 className="text-3xl font-semibold">
//         Thank you for participating in the Poll
//       </h1>
//       <button
//         onClick={handleRedirect} // Call handleRedirect on button click
//         className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//       >
//         Go to Analytics
//       </button>
//     </div>
//   );
// };

// export default PollSubmitted;

//src/components/Quiz/PollSubmitted.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PropTypes from 'prop-types'; // Import PropTypes

const PollSubmitted = ({ userId, setIsAnalytics }) => { // Accept userId and setIsAnalytics as props
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRedirect = () => {
    setIsAnalytics(true); // Set analytics state to true
    navigate(`/analytics/${userId}`); // Redirect to the analytics page with userId
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-3xl font-semibold mb-4">
        Thank you for participating in the Poll
      </h1>
      <button
        onClick={handleRedirect} // Call handleRedirect on button click
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition"
        aria-label="Go to Analytics" // Add an aria-label for accessibility
      >
        Go to Analytics
      </button>
    </div>
  );
};

// Define prop types
PollSubmitted.propTypes = {
  userId: PropTypes.string.isRequired, // Ensure userId is a required string
  setIsAnalytics: PropTypes.func.isRequired, // Ensure setIsAnalytics is a required function
};

export default PollSubmitted;