// src/components/Quiz/Analysis.jsx
import React, { useEffect, useState } from "react";
import {
  get_Quizzes,
  delete_Quiz,
  increment_QuizAttempts,
} from "../../api/quizApi";
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
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [quizDetails, setQuizDetails] = useState({
    quizId: "",
    isPoll: false,
    isQna: false,
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { userId } = useParams();
  const [modalQuizId, setModalQuizId] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    let sortedQuizzes = [...quizzes];

    if (searchTerm) {
      sortedQuizzes = sortedQuizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig !== null) {
      sortedQuizzes.sort((a, b) => {
        if (
          sortConfig.key === "createdAt" ||
          sortConfig.key === "attempts" ||
          sortConfig.key === "title"
        ) {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        }
        return 0;
      });
    }

    setFilteredQuizzes(sortedQuizzes);
  }, [quizzes, searchTerm, sortConfig]);

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
        setModalQuizId(null);
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
    navigate(
      type === "poll"
        ? `/edit_poll/${userId}/${quizId}`
        : `/edit_qna/${userId}/${quizId}`
    );
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
    handleQuizAttempt(quizId); // Increment attempts on analysis view
  };

  // Sort quizzes based on key and direction
  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <span className="inline-block ml-1">🔼</span>
    ) : (
      <span className="inline-block ml-1">🔽</span>
    );
  };

  return (
    <>
      <Navbar
        isAnalytics={isAnalytics}
        setIsAnalytics={setIsAnalytics}
        userId={userId}
      />
      {!quizzes.length && !quizDetails.isPoll && !quizDetails.isQna && (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-teal-400">
          <h1 className="text-xl font-bold text-gray-100">No quizzes found</h1>
        </div>
      )}

      {quizzes.length > 0 && !quizDetails.isPoll && !quizDetails.isQna && (
        <div className="overflow-x-auto p-6 bg-gray-50 min-h-screen">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gradient-to-r from-teal-500 to-purple-600 text-white">
                  <th
                    className="py-3 px-4 cursor-pointer"
                    onClick={() => requestSort("index")}
                  >
                    S.No {renderSortIcon("index")}
                  </th>
                  <th
                    className="py-3 px-4 cursor-pointer"
                    onClick={() => requestSort("title")}
                  >
                    Quiz Name {renderSortIcon("title")}
                  </th>
                  <th
                    className="py-3 px-4 cursor-pointer"
                    onClick={() => requestSort("createdAt")}
                  >
                    Created On {renderSortIcon("createdAt")}
                  </th>
                  <th
                    className="py-3 px-4 cursor-pointer"
                    onClick={() => requestSort("attempts")}
                  >
                    Attempts {renderSortIcon("attempts")}
                  </th>
                  <th className="py-3 px-4 text-center">Actions</th>
                  <th className="py-3 px-4 text-center">Analysis</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuizzes.map((quiz, index) => (
                  <tr
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200 transition duration-300`}
                    key={quiz._id}
                  >
                    <td className="py-3 px-4 text-center">{index + 1}</td>
                    <td className="py-3 px-4 text-center font-medium">
                      {quiz.title}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {new Date(quiz.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-center">{quiz.attempts}</td>
                    <td className="py-3 px-4 text-center flex justify-center space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-700 transition transform hover:scale-110"
                        onClick={() => handleEdit(quiz._id, quiz.type)}
                      >
                        <FaRegEdit size={20} className="hover:scale-110" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 transition transform hover:scale-110"
                        onClick={() => setModalQuizId(quiz._id)}
                      >
                        <RiDeleteBin6Fill
                          size={20}
                          className="hover:scale-110"
                        />
                      </button>
                      <button
                        className="text-green-500 hover:text-green-700 transition transform hover:scale-110"
                        onClick={() => handleShare(quiz._id)}
                      >
                        <IoMdShare size={20} className="hover:scale-110" />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Link
                        className="text-indigo-500 hover:text-indigo-700 font-semibold transition"
                        onClick={() =>
                          questionWiseAnalysis(quiz._id, quiz.type)
                        }
                      >
                        View Analysis
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
