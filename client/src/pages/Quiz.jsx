// src/pages/Quiz.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_PollById } from "../api/pollApi";
import { get_QnaById } from "../api/qnaApi";
import { create_Response } from "../api/responseApi";
import { get_QuizById } from "../api/quizApi";
import PollSubmitted from "../components/Quiz/PollSubmitted";
import QnaSubmitted from "../components/Quiz/QnaSubmitted";

const userId = localStorage.getItem("userId");

const Quiz = ({ setIsAnalytics }) => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({});
  const [items, setItems] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [pollData, setPollData] = useState([]);
  const [qnaData, setQnaData] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [pollSubmit, setPollSubmit] = useState(false);
  const [qnaSubmit, setQnaSubmit] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const fetchQuiz = async () => {
    const response = await get_QuizById(quizId);
    if (response.status === 200) {
      setQuiz(response.data);
      if (response.data.type === "poll") {
        const responsePoll = await get_PollById(quizId);
        if (responsePoll.status === 200) {
          setItems(responsePoll.data.pollArray);
        }
      } else if (response.data.type === "qna") {
        const responseQna = await get_QnaById(quizId);
        if (responseQna.status === 200) {
          setItems(responseQna.data.qnaArray);
        }
      }
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (items.length > 0) {
      setSelectedItem(items[selectedItemIndex]);
    }
  }, [items, selectedItemIndex]);

  useEffect(() => {
    if (selectedItem && selectedItem.timer !== "off") {
      setTimeLeft(parseInt(selectedItem.timer, 10));
    } else {
      setTimeLeft(null);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }

    if (timeLeft === 0) {
      handleNext();

      if (selectedItemIndex === items.length - 1) {
        handleSubmit();
        setTimeLeft(null);
        return;
      }
    }
  }, [timeLeft]);

  const handleNext = () => {
    if (selectedItemIndex < items.length - 1) {
      setSelectedItemIndex((prevIndex) => prevIndex + 1);
      setClickedIndex(null); // Reset clicked index on moving to next question
    }
  };

  const handleClick = (index) => {
    setClickedIndex(index);
    if (quiz.type === "poll") {
      setPollData((prev) => [
        ...prev,
        { name: items[selectedItemIndex].name, answer: index },
      ]);
    } else if (quiz.type === "qna") {
      if (index === items[selectedItemIndex].answerIndex) {
        setCorrect((prev) => prev + 1);
        setQnaData((prev) => [
          ...prev,
          { name: items[selectedItemIndex].name, answer: 1 },
        ]);
      } else {
        setQnaData((prev) => [
          ...prev,
          { name: items[selectedItemIndex].name, answer: 0 },
        ]);
      }
    }
  };

  const handleSubmit = async () => {
    if (quiz.type === "poll") {
      if (pollData.length !== 0) {
        const res = await create_Response(quizId, pollData);
        if (res.status === 200) {
          setTimeLeft(null);
        }
      }
      setPollSubmit(true);
    } else if (quiz.type === "qna") {
      if (qnaData.length !== 0) {
        const res = await create_Response(quizId, qnaData);
        if (res.status === 200) {
          setTimeLeft(null);
        }
      }
      setQnaSubmit(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-teal-400">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg overflow-auto">
        {!pollSubmit && !qnaSubmit && selectedItem && (
          <div className="flex flex-col">
            <div className="flex justify-between mb-6">
              <h2 className="text-lg font-semibold">
                {selectedItemIndex + 1}/{items.length}
              </h2>
              {timeLeft !== null && (
                <h2 className="text-red-500 font-bold">{timeLeft}s</h2>
              )}
            </div>
            <h1 className="text-2xl font-bold mb-4">{selectedItem.question}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedItem.inputs.map((input, index) => (
                <div
                  key={index}
                  className={`p-4 border-2 rounded-lg transition duration-200 ${
                    clickedIndex === index
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-500 hover:border-blue-300 hover:bg-green-300"
                  } flex justify-center items-center cursor-pointer shadow-sm`}
                  onClick={() => handleClick(index)}
                >
                  {selectedItem.type === "text" && (
                    <p className="font-semibold text-lg">{input.text}</p>
                  )}

                  {selectedItem.type === "imageUrl" && (
                    <img
                      src={input.imageUrl}
                      alt={`Input ${index + 1}`}
                      className="w-full h-auto rounded-lg"
                    />
                  )}

                  {selectedItem.type === "both" && (
                    <div className="flex justify-between items-center w-full">
                      <p className="w-1/2 font-semibold text-lg">
                        {input.text}
                      </p>
                      <img
                        src={input.imageUrl}
                        alt={`Input ${index + 1}`}
                        className="w-1/2 h-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                className={`py-3 px-6 rounded-lg text-white transition duration-200 ${
                  selectedItemIndex === items.length - 1
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
                onClick={
                  selectedItemIndex === items.length - 1
                    ? handleSubmit
                    : handleNext
                }
              >
                {selectedItemIndex === items.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        )}

        {pollSubmit && (
          <PollSubmitted userId={userId} setIsAnalytics={setIsAnalytics} />
        )}

        {qnaSubmit && (
          <QnaSubmitted
            correct={correct}
            total={items.length}
            userId={userId}
            setIsAnalytics={setIsAnalytics}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
