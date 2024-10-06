// src/pages/EditQna.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get_QnaById, update_Qna } from "../api/qnaApi";
import { toast } from "react-toastify";

const EditQna = () => {
  const { quizId, userId } = useParams();
  const [items, setItems] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const fetchQuiz = async () => {
    const response = await get_QnaById(quizId);
    if (response.data) {
      setItems(response.data.qnaArray);
    }
  };

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [validationMessages, setValidationMessages] = useState({
    question: "",
    input: "",
    answer: "",
  });

  const handleInputChange = (index, inputIndex, field, value) => {
    const newItems = [...items];
    newItems[index].inputs[inputIndex][field] = value;
    setItems(newItems);
  };

  const handleQuestionChange = (index, value) => {
    const newItems = [...items];
    newItems[index].question = value;
    setItems(newItems);
  };

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const handleTimerChange = (index, timerValue) => {
    const newItems = [...items];
    newItems[index].timer = timerValue;
    setItems(newItems);
  };

  const updateQna = async () => {
    const newValidationMessages = {
      question: "",
      input: "",
      answer: "",
    };

    const allQuestionsFilled = items.every(
      (item) => item.question.trim() !== ""
    );
    const allInputsFilled = items.every((item) =>
      item.inputs.every((input) =>
        item.type === "both"
          ? input.text.trim() !== "" && input.imageUrl.trim() !== ""
          : input.text.trim() !== "" || input.imageUrl.trim() !== ""
      )
    );
    const allAnswersSelected = items.every((item) => item.answerIndex !== null);

    if (!allQuestionsFilled) {
      newValidationMessages.question =
        "Please fill in the question for every item.";
    }
    if (!allInputsFilled) {
      newValidationMessages.input =
        "Please fill in all input fields for every item.";
    }
    if (!allAnswersSelected) {
      newValidationMessages.answer = "Please select an answer for each item.";
    }

    setValidationMessages(newValidationMessages);

    if (allQuestionsFilled && allInputsFilled && allAnswersSelected) {
      const response = await update_Qna(items, quizId);
      if (response.status === 201) {
        toast.success("Quiz updated successfully!");
        navigate(`/share_quiz/${userId}/${quizId}`);
      }
    } else {
      if (newValidationMessages.question) {
        toast.error(newValidationMessages.question);
      }
      if (newValidationMessages.input) {
        toast.error(newValidationMessages.input);
      }
      if (newValidationMessages.answer) {
        toast.error(newValidationMessages.answer);
      }
    }
  };

  if (!items) {
    return <div>Loading...</div>;
  }

  const selectedItem = items[selectedItemIndex];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-green-500 p-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit MCQ's
        </h2>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-4">
            <div className="flex flex-col">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(index)}
                  className={`text-lg font-semibold px-4 py-2 rounded-lg border transition duration-200 ${
                    index === selectedItemIndex
                      ? "bg-blue-600 text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="flex-grow">
              {selectedItem && (
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={selectedItem.question}
                    onChange={(e) =>
                      handleQuestionChange(selectedItemIndex, e.target.value)
                    }
                    placeholder="Q & A question"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 mb-4"
                  />
                  <div className="flex flex-col mt-2 space-y-2">
                    {selectedItem.inputs.map((input, inputIndex) => (
                      <div
                        key={inputIndex}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <input
                          type="radio"
                          name={`answer-${selectedItemIndex}`}
                          checked={selectedItem.answerIndex === inputIndex}
                          onChange={() =>
                            handleInputChange(
                              selectedItemIndex,
                              inputIndex,
                              "answerIndex",
                              inputIndex
                            )
                          }
                          className="h-5 w-5 text-blue-600 border-gray-300 rounded-full focus:ring-blue-500"
                        />
                        {selectedItem.type === "text" && (
                          <input
                            type="text"
                            value={input.text}
                            onChange={(e) =>
                              handleInputChange(
                                selectedItemIndex,
                                inputIndex,
                                "text",
                                e.target.value
                              )
                            }
                            placeholder="Option text"
                            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                          />
                        )}
                        {selectedItem.type === "imageUrl" && (
                          <input
                            type="text"
                            value={input.imageUrl}
                            onChange={(e) =>
                              handleInputChange(
                                selectedItemIndex,
                                inputIndex,
                                "imageUrl",
                                e.target.value
                              )
                            }
                            placeholder="Image URL"
                            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                          />
                        )}
                        {selectedItem.type === "both" && (
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={input.text}
                              onChange={(e) =>
                                handleInputChange(
                                  selectedItemIndex,
                                  inputIndex,
                                  "text",
                                  e.target.value
                                )
                              }
                              placeholder="Option text"
                              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            />
                            <input
                              type="text"
                              value={input.imageUrl}
                              onChange={(e) =>
                                handleInputChange(
                                  selectedItemIndex,
                                  inputIndex,
                                  "imageUrl",
                                  e.target.value
                                )
                              }
                              placeholder="Image URL"
                              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2">Timer</h4>
                    <div className="flex flex-wrap space-x-2">
                      {["off", "5", "10"].map((time) => (
                        <button
                          key={time}
                          className={`flex-1 px-4 py-2 rounded-lg border transition duration-200 ${
                            selectedItem.timer === time
                              ? "bg-blue-600 text-white"
                              : "border-gray-300 text-gray-700 hover:bg-gray-200"
                          }`}
                          onClick={() =>
                            handleTimerChange(selectedItemIndex, time)
                          }
                        >
                          {time === "off" ? "Off" : `${time} seconds`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-6">
            <button
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200 mb-2 sm:mb-0"
              onClick={() => navigate(`/analytics/${userId}`)}
            >
              Cancel
            </button>
            <button
              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
              onClick={updateQna}
            >
              Update Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQna;
