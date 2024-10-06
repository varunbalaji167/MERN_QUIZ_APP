// src/components/Quiz/PollResponse.jsx
import React, { useState, useEffect } from "react";
import { get_ResponseById } from "../../api/responseApi";
import { get_QuizById } from "../../api/quizApi";
import { get_PollById } from "../../api/pollApi";

const PollResponse = ({ quizId }) => {
  const [response, setResponse] = useState(null);
  const [poll, setPoll] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await get_ResponseById(quizId);
        if (res.status === 200) {
          setResponse(res.data);
        } else {
          throw new Error("Failed to fetch response");
        }

        const pollRes = await get_PollById(quizId);
        if (pollRes.data) {
          setPoll(pollRes.data.pollArray);
        } else {
          throw new Error("Failed to fetch poll");
        }

        const quizRes = await get_QuizById(quizId);
        if (quizRes.data) {
          setQuiz(quizRes.data);
        } else {
          throw new Error("Failed to fetch quiz");
        }
      } catch (err) {
        setError(err.message);
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
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  if (!response || !poll || !quiz) {
    return <div className="text-center text-xl">No data available.</div>;
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
      <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
        <h2 className="text-blue-600 text-3xl md:text-4xl font-bold">
          {quiz.title} Questions Analysis
        </h2>
        <div className="text-orange-600 font-semibold text-lg">
          <p>Created on: {quiz.createdAt}</p>
        </div>
      </div>

      <div>
        {resultCounts.map((result, index) => (
          <div className="border-b border-gray-400 mb-4 pb-4" key={index}>
            <h3 className="text-2xl font-semibold mb-3">
              Q.{index + 1} {result.question}?
            </h3>
            <div className="flex flex-wrap gap-6">
              {result.counts.map((count, countIndex) => (
                <div
                  className="flex flex-col justify-center items-center gap-2 p-4 rounded-md bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-1/3 md:w-1/4"
                  key={countIndex}
                >
                  <div className="text-3xl font-bold text-blue-500">
                    {count.count}
                  </div>
                  <div className="font-semibold text-gray-700">
                    {count.option}
                  </div>
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
