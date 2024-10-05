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
    <div className="flex flex-col lg:flex-row items-center justify-between p-5 bg-gray-800 text-white w-full">
      <h1 className="text-4xl font-bold text-center lg:text-left lg:w-1/4">
        Quiz Maker
      </h1>
      <div className="flex flex-col lg:flex-row lg:w-3/4">
        <button
          className={`text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 w-full lg:w-auto ${
            isAnalytics ? "shadow-lg" : ""
          }`}
          onClick={() => {
            setIsAnalytics(true); // Ensure analytics state is set to true
            navigate(`/analytics/${userId}`);
          }}
        >
          Analytics
        </button>
        <button
          className="text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 w-full lg:w-auto"
          onClick={() => navigate(`/create_quiz/${userId}`)}
        >
          Create Quiz
        </button>
        <button
          className="text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 w-full lg:w-auto"
          onClick={() => navigate(`/attempt_quiz/${userId}`)}
        >
          Attempt Quiz
        </button>
      </div>
      <h2
        className="cursor-pointer border-t-2 border-gray-700 pt-3 text-center lg:border-none lg:pt-0 lg:ml-5"
        onClick={handleLogout}
      >
        LOGOUT
      </h2>
    </div>
  );
};

export default Navbar;

// // src/pages/Navbar.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Navbar = ({ isAnalytics, setIsAnalytics, userId }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     navigate("/");
//   };

//   const handleAnalyticsClick = () => {
//     // Navigate to Analytics page even if isAnalytics is true
//     setIsAnalytics(true); // Ensure analytics state is set
//     navigate(`/analytics/${userId}`); // Force navigation to the analytics page
//   };

//   return (
//     <div className="flex flex-col lg:flex-row items-center justify-between p-5 bg-gray-800 text-white w-full">
//       <h1 className="text-4xl font-bold text-center lg:text-left lg:w-1/4">
//         Quiz Maker
//       </h1>
//       <div className="flex flex-col lg:flex-row lg:w-3/4">
//         <button
//           className="text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 w-full lg:w-auto"
//           onClick={handleAnalyticsClick}
//           aria-label="View Analytics"
//         >
//           Analytics
//         </button>
//         <button
//           className="text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 w-full lg:w-auto"
//           onClick={() => navigate(`/create_quiz/${userId}`)}
//           aria-label="Create a Quiz"
//         >
//           Create Quiz
//         </button>
//         <button
//           className="text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 w-full lg:w-auto"
//           onClick={() => navigate(`/attempt_quiz/${userId}`)}
//           aria-label="Attempt a Quiz"
//         >
//           Attempt Quiz
//         </button>
//       </div>
//       <h2
//         className="cursor-pointer border-t-2 border-gray-700 pt-3 text-center lg:border-none lg:pt-0 lg:ml-5"
//         onClick={handleLogout}
//         aria-label="Logout"
//       >
//         LOGOUT
//       </h2>
//     </div>
//   );
// };

// export default Navbar;