import React, { useState, useEffect } from "react";
import { get_ResponseById } from "../../api/responseApi";
import { get_QuizById } from "../../api/quizApi";
import { get_PollById } from "../../api/pollApi";

const PollResponse = ({ quizId }) => {
  const [response, setResponse] = useState(null);
  const [poll, setPoll] = useState(null);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    fetchResponse();
    fetchPoll();
    fetchQuiz(quizId);
  }, [quizId]);

  const fetchResponse = async () => {
    const res = await get_ResponseById(quizId);
    if (res.status === 200) {
      setResponse(res.data);
    }
  };

  const fetchPoll = async () => {
    const res = await get_PollById(quizId);
    if (res.data) {
      setPoll(res.data.pollArray);
    }
  };

  const fetchQuiz = async (quizId) => {
    const res = await get_QuizById(quizId);
    if (res.data) {
      setQuiz(res.data);
    }
  };

  if (!response || !poll || !quiz) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  const resultCounts = poll.map((item) => ({
    question: item.question,
    counts: item.inputs.map((_, index) => ({
      option: `Option ${index + 1}`,
      count: response.reduce((count, res) => {
        const matchingAnswers = res.responseData.filter(
          (responseItem) =>
            responseItem.name === item.name && responseItem.answer === index
        );
        return count + matchingAnswers.length;
      }, 0),
    })),
  }));

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-blue-600 text-4xl">{quiz.title} Questions Analysis</h2>
        <div className="text-orange-600 font-bold text-lg">
          <p>Created on: {quiz.createdAt}</p>
        </div>
      </div>

      <div>
        {resultCounts.map((result, index) => (
          <div className="border-b border-gray-400 mb-4 pb-4" key={index}>
            <h3 className="text-2xl mb-3">Q.{index + 1} {result.question}?</h3>
            <div className="flex gap-6">
              {result.counts.map((count, countIndex) => (
                <div
                  className="flex justify-center items-center gap-2 p-4 rounded-md bg-white shadow-md w-1/4"
                  key={countIndex}
                >
                  <div className="text-2xl font-bold">{count.count}</div>
                  <div className="font-bold">{count.option}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollResponse;
