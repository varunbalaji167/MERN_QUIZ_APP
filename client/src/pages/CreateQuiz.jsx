import React, { useState } from "react";
import { create_Quiz } from "../api/quizApi";
import { useNavigate, useParams } from "react-router-dom";
import CreateQnA from "../components/Quiz/CreateQnA";
import CreatePoll from "../components/Quiz/CreatePoll";
import { toast } from "react-toastify";

function CreateQuiz() {
  const [quizType, setQuizType] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [quizId, setQuizId] = useState("");
  const [isPoll, setIsPoll] = useState(false);
  const [isQna, setIsQna] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = useParams().userId;

  const handleCreate = async () => {
    if (quizTitle.trim() === "" || quizType === "") {
      toast.error("Please provide both a quiz name and a quiz type.");
      return;
    }

    const quiz = {
      title: quizTitle,
      type: quizType,
    };
    const response = await create_Quiz(quiz, token);
    if (response.status === 201) {
      console.log("Quiz created successfully!");
      setQuizId(response.data._id);
      if (quizType === "poll") {
        setIsPoll(true);
      } else if (quizType === "qna") {
        setIsQna(true);
      }
    }
  };

  const handleQuizTypeChange = (event) => {
    setQuizType(event.target.value);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black bg-opacity-50">
      {!isPoll && !isQna ? (
        <div className="bg-white p-10 w-80 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Quiz name"
            onChange={(e) => setQuizTitle(e.target.value)}
            className="mt-2 p-3 w-full border rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between items-center mt-4">
            <h3 className="text-gray-600 text-lg">Quiz type</h3>
            <div className="flex space-x-4">
              <label className={`radio-button ${quizType === "qna" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="quizType"
                  value="qna"
                  onChange={handleQuizTypeChange}
                  className="mr-1"
                />{" "}
                MCQ's
              </label>
              <label className={`radio-button ${quizType === "poll" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="quizType"
                  value="poll"
                  onChange={handleQuizTypeChange}
                  className="mr-1"
                />{" "}
                Poll 
              </label>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <button
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md shadow hover:bg-gray-400"
              onClick={() => navigate(`/analytics/${userId}`)}
            >
              Cancel
            </button>
            <button
              className="py-2 px-4 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
              onClick={handleCreate}
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div>
          {isPoll && <CreatePoll quizId={quizId} />}
          {isQna && <CreateQnA quizId={quizId} />}
        </div>
      )}
    </div>
  );
}

export default CreateQuiz;
