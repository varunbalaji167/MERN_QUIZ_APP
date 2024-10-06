// src/pages/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAnalytics, setIsAnalytics, userId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-teal-500 text-white shadow-md w-full">
      <h1 className="text-3xl font-semibold text-center lg:text-left lg:w-1/4 mb-2 lg:mb-0">
        Quiz Maker
      </h1>
      <div className="flex flex-col lg:flex-row lg:w-3/4 space-y-2 lg:space-y-0 lg:space-x-4">
        <button
          className={`text-white font-semibold py-1 px-4 rounded-md transition duration-200 w-full lg:w-auto ${
            isAnalytics ? "bg-blue-600 shadow-md" : "hover:bg-gray-700"
          } hover:underline`}
          onClick={() => {
            setIsAnalytics(true);
            navigate(`/analytics/${userId}`);
          }}
        >
          Analytics
        </button>
        <button
          className="text-white font-semibold py-1 px-4 rounded-md transition duration-200 w-full lg:w-auto hover:bg-gray-700 hover:underline"
          onClick={() => navigate(`/create_quiz/${userId}`)}
        >
          Create Quiz
        </button>
        <button
          className="text-white font-semibold py-1 px-4 rounded-md transition duration-200 w-full lg:w-auto hover:bg-gray-700 hover:underline"
          onClick={() => navigate(`/attempt_quiz/${userId}`)}
        >
          Attempt Quiz
        </button>
      </div>
      <h2
        className="text-white text-center font-semibold py-1 px-4 mt-2 rounded-md transition duration-200 w-full lg:w-auto hover:bg-gray-700 hover:underline"
        onClick={handleLogout}
      >
        LOGOUT
      </h2>
    </div>
  );
};

export default Navbar;
