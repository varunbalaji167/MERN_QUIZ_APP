import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import trophy from '../../assets/trophy.png';

const QnaSubmitted = ({ correct, total, userId, setIsAnalytics = () => {} }) => { // Default to empty function
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRedirect = () => {
    setIsAnalytics(true); // Set analytics state to true
    navigate(`/analytics/${userId}`); // Redirect to the analytics page with userId
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-semibold mb-4">Congrats! Quiz is Completed</h1>
      <img src={trophy} alt="trophy" className="w-1/2 h-auto mb-4" />
      <div className="font-bold text-2xl">
        <span>Your score is </span>
        <span className="text-green-600">{correct}/{total}</span>
      </div>
      <button
        onClick={handleRedirect} // Call handleRedirect on button click
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Go to Analytics
      </button>
    </div>
  );
};

export default QnaSubmitted;