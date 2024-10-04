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

    const allQuestionsFilled = items.every((item) => item.question.trim() !== "");
    const allInputsFilled = items.every((item) =>
      item.inputs.every((input) =>
        item.type === "both"
          ? input.text.trim() !== "" && input.imageUrl.trim() !== ""
          : input.text.trim() !== "" || input.imageUrl.trim() !== ""
      )
    );
    const allAnswersSelected = items.every((item) => item.answerIndex !== null);

    if (!allQuestionsFilled) {
      newValidationMessages.question = "Please fill in the question for every item.";
    }
    if (!allInputsFilled) {
      newValidationMessages.input = "Please fill in all input fields for every item.";
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
    <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Q&A</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <div className="flex flex-col">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(index)}
                  className={`text-lg font-medium px-4 py-2 rounded-lg border ${
                    index === selectedItemIndex
                      ? "bg-green-500 text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="flex-grow">
              {selectedItem && (
                <div>
                  <input
                    type="text"
                    value={selectedItem.question}
                    onChange={(e) =>
                      handleQuestionChange(selectedItemIndex, e.target.value)
                    }
                    placeholder="Q & A question"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex flex-col mt-4">
                    {selectedItem.inputs.map((input, inputIndex) => (
                      <div key={inputIndex} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`answer-${selectedItemIndex}`}
                          checked={selectedItem.answerIndex === inputIndex}
                          onChange={() => handleInputChange(selectedItemIndex, inputIndex, "answerIndex", inputIndex)}
                          className="h-5 w-5 text-green-600 border-gray-300 rounded-full focus:ring-green-500"
                        />
                        {selectedItem.type === "text" && (
                          <input
                            type="text"
                            value={input.text}
                            onChange={(e) =>
                              handleInputChange(selectedItemIndex, inputIndex, "text", e.target.value)
                            }
                            placeholder="Option text"
                            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        )}
                        {selectedItem.type === "imageUrl" && (
                          <input
                            type="text"
                            value={input.imageUrl}
                            onChange={(e) =>
                              handleInputChange(selectedItemIndex, inputIndex, "imageUrl", e.target.value)
                            }
                            placeholder="Image URL"
                            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        )}
                        {selectedItem.type === "both" && (
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={input.text}
                              onChange={(e) =>
                                handleInputChange(selectedItemIndex, inputIndex, "text", e.target.value)
                              }
                              placeholder="Option text"
                              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <input
                              type="text"
                              value={input.imageUrl}
                              onChange={(e) =>
                                handleInputChange(selectedItemIndex, inputIndex, "imageUrl", e.target.value)
                              }
                              placeholder="Image URL"
                              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2">Timer</h4>
                    <div className="flex space-x-2">
                      {["off", "5", "10"].map((time) => (
                        <button
                          key={time}
                          className={`px-4 py-2 rounded-lg border ${
                            selectedItem.timer === time
                              ? "bg-green-500 text-white"
                              : "border-gray-300 text-gray-700 hover:bg-gray-200"
                          }`}
                          onClick={() => handleTimerChange(selectedItemIndex, time)}
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

          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              onClick={() => navigate(`/analytics/${userId}`)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
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