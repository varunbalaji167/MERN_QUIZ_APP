// src/components/Quiz/QnaResponse.jsx
import React, { useState, useEffect } from "react";
import { get_ResponseById } from "../../api/responseApi";
import { get_QnaById } from "../../api/qnaApi";
import { get_QuizById } from "../../api/quizApi";

const QnaResponse = ({ quizId }) => {
  const [response, setResponse] = useState(null);
  const [qna, setQna] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseRes = await get_ResponseById(quizId);
        if (responseRes.status === 200) {
          setResponse(responseRes.data);
        }

        const qnaRes = await get_QnaById(quizId);
        if (qnaRes.data) {
          setQna(qnaRes.data.qnaArray);
        }

        const quizRes = await get_QuizById(quizId);
        if (quizRes.data) {
          setQuiz(quizRes.data);
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quizId]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const results = qna.map((item) => {
    const counts = response.reduce(
      (acc, res) => {
        const answer = res.responseData.find((data) => data.name === item.name);
        if (answer) {
          acc.totalAttempts++;
          if (answer.answer === 1) acc.correctCount++;
          else if (answer.answer === 0) acc.incorrectCount++;
        }
        return acc;
      },
      { correctCount: 0, incorrectCount: 0, totalAttempts: 0 }
    );

    return {
      question: item.question,
      ...counts,
    };
  });

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-blue-600 text-4xl font-bold">
          {quiz.title} Questions Analysis
        </h2>
        <div className="text-orange-600 font-semibold text-lg">
          <p>Created on: {quiz.createdAt}</p>
        </div>
      </div>
      <div className="space-y-8">
        {results.map((result, index) => (
          <div
            key={index}
            className="border-b border-gray-300 pb-6 mb-6 bg-white rounded-md shadow-md p-4"
          >
            <h3 className="text-2xl mb-4 text-gray-800 font-semibold">
              Q.{index + 1} {result.question}?
            </h3>
            <div className="flex gap-6 justify-around">
              <div className="flex flex-col items-center bg-blue-50 p-4 rounded-md shadow-lg w-1/4">
                <div className="text-3xl font-bold text-blue-600">
                  {result.totalAttempts}
                </div>
                <div className="font-medium text-gray-700 mt-2 px-2">
                  People Attempted the Question
                </div>{" "}
                {/* Added padding */}
              </div>
              <div className="flex flex-col items-center bg-green-50 p-4 rounded-md shadow-lg w-1/4">
                <div className="text-3xl font-bold text-green-600">
                  {result.correctCount}
                </div>
                <div className="font-medium text-gray-700 mt-2 px-2">
                  Answered Correctly
                </div>{" "}
                {/* Added padding */}
              </div>
              <div className="flex flex-col items-center bg-red-50 p-4 rounded-md shadow-lg w-1/4">
                <div className="text-3xl font-bold text-red-600">
                  {result.incorrectCount}
                </div>
                <div className="font-medium text-gray-700 mt-2 px-2">
                  Answered Incorrectly
                </div>{" "}
                {/* Added padding */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnaResponse;
