import React, { useState, useEffect } from "react";
import { get_ResponseById } from "../../api/responseApi";
import { get_QnaById } from "../../api/qnaApi";
import { get_QuizById } from "../../api/quizApi";

const QnaResponse = ({ quizId }) => {
  const [response, setResponse] = useState(null);
  const [qna, setQna] = useState(null);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    fetchResponse();
    fetchQna();
    fetchQuiz(quizId);
  }, [quizId]);

  const fetchResponse = async () => {
    const res = await get_ResponseById(quizId);
    if (res.status === 200) {
      setResponse(res.data);
    }
  };

  const fetchQna = async () => {
    const res = await get_QnaById(quizId);
    if (res.data) {
      setQna(res.data.qnaArray);
    }
  };

  const fetchQuiz = async (quizId) => {
    const res = await get_QuizById(quizId);
    if (res.data) {
      setQuiz(res.data);
    }
  };

  if (!response || !qna || !quiz) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  const results = qna.map((item) => {
    let correctCount = 0;
    let incorrectCount = 0;

    response.forEach((res) => {
      res.responseData.forEach((data) => {
        if (data.name === item.name) {
          if (data.answer === 1) {
            correctCount++;
          } else if (data.answer === 0) {
            incorrectCount++;
          }
        }
      });
    });
    const totalAttempts = correctCount + incorrectCount;

    return {
      question: item.question,
      correctCount,
      incorrectCount,
      totalAttempts,
    };
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-blue-600 text-4xl">{quiz.title} Questions Analysis</h2>
        <div className="text-orange-600 font-bold text-lg">
          <p>Created on: {quiz.createdAt}</p>
        </div>
      </div>
      <div className="space-y-6">
        {results.map((result, index) => (
          <div key={index} className="border-b border-gray-400 pb-4 mb-4">
            <h3 className="text-2xl mb-3">Q.{index + 1} {result.question}?</h3>
            <div className="flex gap-8">
              <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-lg w-1/4">
                <div className="text-2xl font-bold">{result.totalAttempts}</div>
                <div className="font-bold">people Attempted the question</div>
              </div>
              <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-lg w-1/4">
                <div className="text-2xl font-bold">{result.correctCount}</div>
                <div className="font-bold">people Answered Correctly</div>
              </div>
              <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-lg w-1/4">
                <div className="text-2xl font-bold">{result.incorrectCount}</div>
                <div className="font-bold">people Answered Incorrectly</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnaResponse;
