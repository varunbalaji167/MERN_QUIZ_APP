// src/pages/EditPoll.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get_PollById, update_Poll } from "../api/pollApi";
import { toast } from "react-toastify";

const EditPoll = () => {
  const { quizId, userId } = useParams();
  const [items, setItems] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPoll();
  }, [quizId]);

  const fetchPoll = async () => {
    const response = await get_PollById(quizId);
    if (response.data) {
      setItems(response.data.pollArray);
    }
  };

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [validationMessages, setValidationMessages] = useState({
    question: "",
    input: "",
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

  const updatePoll = async () => {
    const newValidationMessages = {
      question: "",
      input: "",
    };

    const allQuestionsFilled = items.every(
      (item) => item.question.trim() !== ""
    );
    const allInputsFilled = items.every((item) =>
      item.inputs.every(
        (input) =>
          input.text.trim() !== "" &&
          (item.type !== "both" || input.imageUrl.trim() !== "")
      )
    );

    if (!allQuestionsFilled) {
      newValidationMessages.question =
        "Please fill in the question for every item.";
    }

    if (!allInputsFilled) {
      newValidationMessages.input =
        "Please fill in all option fields for every question.";
    }

    setValidationMessages(newValidationMessages);

    if (allQuestionsFilled && allInputsFilled) {
      const response = await update_Poll(items, quizId);
      if (response.status === 201) {
        toast.success("Poll updated successfully!");
        navigate(`/share_quiz/${userId}/${quizId}`);
      } else {
        toast.error("Failed to update poll");
      }
    } else {
      if (newValidationMessages.question) {
        toast.error(newValidationMessages.question);
      }
      if (newValidationMessages.input) {
        toast.error(newValidationMessages.input);
      }
    }
  };

  if (!items) return null;
  const selectedItem = items[selectedItemIndex];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-teal-400 p-4">
      {" "}
      {/* Gradient background */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {items && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Edit Poll
            </h2>{" "}
            {/* Title */}
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col">
                {items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemClick(index)}
                    className={`py-2 px-4 border rounded-md text-lg transition duration-200 ${
                      index === selectedItemIndex
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
            {selectedItem && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={selectedItem.question}
                    onChange={(e) =>
                      handleQuestionChange(selectedItemIndex, e.target.value)
                    }
                    placeholder="Poll question"
                    className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                </div>

                <div className="flex flex-col mb-4">
                  {selectedItem.inputs.map((input, inputIndex) => (
                    <div
                      key={inputIndex}
                      className="flex items-center gap-2 mb-2"
                    >
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
                          placeholder="Text"
                          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
                          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                      )}

                      {selectedItem.type === "both" && (
                        <div className="flex gap-2 w-full">
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
                            placeholder="Text"
                            className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
                            className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Timer Options */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Timer</h4>
                  <div className="flex gap-4">
                    {["off", "5 sec", "10 sec"].map((option) => (
                      <button
                        key={option}
                        className={`py-2 px-4 border rounded-md text-lg transition duration-200 ${
                          selectedItem.timer === option
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() =>
                          handleTimerChange(selectedItemIndex, option)
                        }
                      >
                        {option === "off" ? "Off" : `${option} `}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-between mt-6">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                onClick={() => navigate(`/analytics/${userId}`)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
                onClick={updatePoll}
              >
                Update Poll
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPoll;
