// // src/components/Quiz/Analysis.jsx
// import React, { useEffect, useState } from "react";
// import { get_Quizzes, delete_Quiz, increment_QuizAttempts } from "../../api/quizApi";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import QnaResponse from "./QnaResponse";
// import PollResponse from "./PollResponse";
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import { IoMdShare } from "react-icons/io";
// import DeleteQuizModel from "./DeleteQuizModel";
// import Navbar from "../../pages/Navbar";

// const Analysis = ({ isAnalytics, setIsAnalytics }) => { 
//   const [quizzes, setQuizzes] = useState([]);
//   const [isPoll, setIsPoll] = useState(false);
//   const [isQna, setIsQna] = useState(false);
//   const [quizId, setQuizId] = useState("");

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const { userId } = useParams();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModel = () => {
//     setIsModalOpen(true);
//   };

//   const closeModel = () => {
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = async () => {
//     const response = await get_Quizzes(token);
//     if (response.data) {
//       setQuizzes(response.data);
//     }
//   };

//   const handleDelete = async (quizId) => {
//     const response = await delete_Quiz(quizId);
//     if (response.status === 200) {
//       fetchQuizzes();
//       closeModel();
//     }
//   };

//   const handleShare = (quizId) => {
//     const path = `${window.location.origin}/quiz/${quizId}`;
//     navigator.clipboard
//       .writeText(path)
//       .then(() => {
//         toast.success("Link copied to clipboard");
//       })
//       .catch((error) => {
//         console.error("Error copying text:", error);
//       });
//   };

//   const handleEdit = (quizId, type) => {
//     if (type === "poll") {
//       navigate(`/edit_poll/${userId}/${quizId}`);
//     } else {
//       navigate(`/edit_qna/${userId}/${quizId}`);
//     }
//   };

//   const handleQuizAttempt = async (quizId) => {
//     try {
//       const response = await increment_QuizAttempts(quizId, token);
//       if (response.status === 200) {
//         toast.success("Quiz attempt recorded!");
//         fetchQuizzes(); // Refresh the quizzes to show the updated attempts count
//       }
//     } catch (error) {
//       console.error("Error incrementing quiz attempts:", error);
//     }
//   };

//   const questionWiseAnalysis = (quizId, type) => {
//     setQuizId(quizId);
//     type === "poll" ? setIsPoll(true) : setIsQna(true);
//     handleQuizAttempt(quizId); // Call this when starting the analysis to increment attempts
//   };

//   return (
//     <>
//       <Navbar isAnalytics={isAnalytics} setIsAnalytics={setIsAnalytics} userId={userId} />
//       {!quizzes.length && !isPoll && !isQna && (
//         <div className="flex justify-center items-center min-h-screen">
//           <h1 className="text-xl font-semibold">No quizzes found</h1>
//         </div>
//       )}

//       {quizzes.length > 0 && !isPoll && !isQna && (
//         <div className="overflow-x-auto p-4">
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-2 px-4 border-b">S.No</th>
//                 <th className="py-2 px-4 border-b">Quiz Name</th>
//                 <th className="py-2 px-4 border-b">Created On</th>
//                 <th className="py-2 px-4 border-b">Attempts</th>
//                 <th className="py-2 px-4 border-b text-center">Actions</th>
//                 <th className="py-2 px-4 border-b text-center">Analysis</th>
//               </tr>
//             </thead>
//             <tbody>
//               {quizzes.map((quiz, index) => (
//                 <tr
//                   className={`${
//                     index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                   } hover:bg-gray-200 transition`}
//                   key={index}
//                 >
//                   <td className="py-2 px-4 border-b">{index + 1}</td>
//                   <td className="py-2 px-4 border-b">{quiz.title}</td>
//                   <td className="py-2 px-4 border-b">{quiz.createdAt}</td>
//                   <td className="py-2 px-4 border-b">{quiz.attempts}</td>
//                   <td className="py-2 px-4 border-b flex justify-center space-x-2">
//                     <button
//                       className="text-blue-500 hover:text-blue-700"
//                       onClick={() => handleEdit(quiz._id, quiz.type)}
//                     >
//                       <FaRegEdit />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       onClick={openModel}
//                     >
//                       <RiDeleteBin6Fill />
//                     </button>
//                     <DeleteQuizModel
//                       isOpen={isModalOpen}
//                       onClose={closeModel}
//                       onDelete={() => handleDelete(quiz._id)}
//                     />
//                     <button
//                       className="text-green-500 hover:text-green-700"
//                       onClick={() => handleShare(quiz._id)}
//                     >
//                       <IoMdShare />
//                     </button>
//                   </td>
//                   <td className="py-2 px-4 border-b text-center">
//                     <Link
//                       className="text-indigo-600 hover:text-indigo-800"
//                       onClick={() => questionWiseAnalysis(quiz._id, quiz.type)}
//                     >
//                       Question Wise Analysis
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {isPoll && <PollResponse quizId={quizId} />}
//       {isQna && <QnaResponse quizId={quizId} />}
//     </>
//   );
// };

// export default Analysis;


// src/components/Quiz/Analysis.jsx
import React, { useEffect, useState } from "react";
import { get_Quizzes, delete_Quiz, increment_QuizAttempts } from "../../api/quizApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import QnaResponse from "./QnaResponse";
import PollResponse from "./PollResponse";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdShare } from "react-icons/io";
import DeleteQuizModel from "./DeleteQuizModel";
import Navbar from "../../pages/Navbar";

const Analysis = ({ isAnalytics, setIsAnalytics }) => { 
  const [quizzes, setQuizzes] = useState([]);
  const [quizDetails, setQuizDetails] = useState({
    quizId: "",
    isPoll: false,
    isQna: false,
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { userId } = useParams();
  const [modalQuizId, setModalQuizId] = useState(null); // Use this to track which quiz is being deleted

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await get_Quizzes(token);
      if (response.data) {
        setQuizzes(response.data);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      toast.error("Failed to fetch quizzes");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await delete_Quiz(modalQuizId);
      if (response.status === 200) {
        fetchQuizzes();
        setModalQuizId(null); // Close modal after deletion
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz");
    }
  };

  const handleShare = (quizId) => {
    const path = `${window.location.origin}/quiz/${quizId}`;
    navigator.clipboard
      .writeText(path)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text:", error);
      });
  };

  const handleEdit = (quizId, type) => {
    navigate(type === "poll" ? `/edit_poll/${userId}/${quizId}` : `/edit_qna/${userId}/${quizId}`);
  };

  const handleQuizAttempt = async (quizId) => {
    try {
      const response = await increment_QuizAttempts(quizId, token);
      if (response.status === 200) {
        toast.success("Quiz attempt recorded!");
        fetchQuizzes(); // Refresh the quizzes to show the updated attempts count
      }
    } catch (error) {
      console.error("Error incrementing quiz attempts:", error);
    }
  };

  const questionWiseAnalysis = (quizId, type) => {
    setQuizDetails({ quizId, isPoll: type === "poll", isQna: type === "qna" });
    handleQuizAttempt(quizId); // Call this when starting the analysis to increment attempts
  };

  return (
    <>
      <Navbar isAnalytics={isAnalytics} setIsAnalytics={setIsAnalytics} userId={userId} />
      {!quizzes.length && !quizDetails.isPoll && !quizDetails.isQna && (
        <div className="flex justify-center items-center min-h-screen">
          <h1 className="text-xl font-semibold">No quizzes found</h1>
        </div>
      )}

      {quizzes.length > 0 && !quizDetails.isPoll && !quizDetails.isQna && (
        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">S.No</th>
                <th className="py-2 px-4 border-b">Quiz Name</th>
                <th className="py-2 px-4 border-b">Created On</th>
                <th className="py-2 px-4 border-b">Attempts</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
                <th className="py-2 px-4 border-b text-center">Analysis</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200 transition`}
                  key={quiz._id}
                >
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{quiz.title}</td>
                  <td className="py-2 px-4 border-b">{quiz.createdAt}</td>
                  <td className="py-2 px-4 border-b">{quiz.attempts}</td>
                  <td className="py-2 px-4 border-b flex justify-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(quiz._id, quiz.type)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => setModalQuizId(quiz._id)}
                    >
                      <RiDeleteBin6Fill />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleShare(quiz._id)}
                    >
                      <IoMdShare />
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <Link
                      className="text-indigo-600 hover:text-indigo-800"
                      onClick={() => questionWiseAnalysis(quiz._id, quiz.type)}
                    >
                      Question Wise Analysis
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {modalQuizId && (
            <DeleteQuizModel
              isOpen={!!modalQuizId}
              onClose={() => setModalQuizId(null)}
              onDelete={handleDelete}
            />
          )}
        </div>
      )}

      {quizDetails.isPoll && <PollResponse quizId={quizDetails.quizId} />}
      {quizDetails.isQna && <QnaResponse quizId={quizDetails.quizId} />}
    </>
  );
};

export default Analysis;