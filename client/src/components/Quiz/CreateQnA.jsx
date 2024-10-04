import React, { useState } from "react";
import { create_Qna } from "../../api/qnaApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDeleteBin6Fill } from "react-icons/ri";

const CreateQnA = ({ quizId }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = useParams().userId;

  const [items, setItems] = useState([
    {
      name: "Item 1",
      question: "",
      type: "text",
      inputs: [
        { text: "", imageUrl: "" },
        { text: "", imageUrl: "" },
      ],
      answerIndex: null,
      timer: "off",
    },
  ]);

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

  const handleTypeChange = (type) => {
    const newItems = [...items];
    newItems[selectedItemIndex].type = type;
    setItems(newItems);
  };

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const addInputField = (index) => {
    const newItems = [...items];
    if (newItems[index].inputs.length < 4) {
      newItems[index].inputs.push({ text: "", imageUrl: "" });
      setItems(newItems);
    }
  };

  const removeInputField = (index, inputIndex) => {
    const newItems = [...items];
    if (newItems[index].inputs.length > 2 && inputIndex >= 2) {
      newItems[index].inputs.splice(inputIndex, 1);
      setItems(newItems);
    }
  };

  const addNewItem = () => {
    const newItem = {
      name: `Item ${items.length + 1}`,
      question: "",
      type: "text",
      inputs: [
        { text: "", imageUrl: "" },
        { text: "", imageUrl: "" },
      ],
      answerIndex: null,
      timer: "off",
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleAnswerSelect = (index, inputIndex) => {
    const newItems = [...items];
    newItems[index].answerIndex = inputIndex;
    setItems(newItems);
  };

  const handleTimerChange = (index, timerValue) => {
    const newItems = [...items];
    newItems[index].timer = timerValue;
    setItems(newItems);
  };

  const createQuiz = async () => {
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
        "Please fill in all option fields for every item.";
    }

    if (!allAnswersSelected) {
      newValidationMessages.answer =
        "Please select an answer for each question.";
    }

    setValidationMessages(newValidationMessages);

    if (allQuestionsFilled && allInputsFilled && allAnswersSelected) {
      const response = await create_Qna(items, quizId, token);

      if (response.status === 201) {
        toast.success("Quiz created successfully!");
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

  const selectedItem = items[selectedItemIndex];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Q & A</h2>
        <div className="items-container mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              {items.map((item, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <button
                    onClick={() => handleItemClick(index)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                      index === selectedItemIndex
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                  <button
                    className="text-red-600 ml-2"
                    onClick={() => deleteItem(index)}
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </div>
              ))}
            </div>
            {items.length < 5 && (
              <button
                onClick={addNewItem}
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Add Item
              </button>
            )}
          </div>
          <div className="text-gray-500 text-sm">Max 5 questions</div>
        </div>

        {selectedItem && (
          <div>
            <input
              type="text"
              value={selectedItem.question}
              onChange={(e) =>
                handleQuestionChange(selectedItemIndex, e.target.value)
              }
              placeholder="Q & A question"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg text-gray-700">Option Type</h3>
              <div className="flex gap-4">
                {["text", "imageUrl", "both"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="inputType"
                      checked={selectedItem.type === type}
                      onChange={() => handleTypeChange(type)}
                      className="mr-2"
                    />
                    {type === "both" ? "Text & Image URL" : type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            {selectedItem.inputs.map((input, inputIndex) => (
              <div className="flex items-center mb-2" key={inputIndex}>
                <input
                  type="radio"
                  name={`answer-${selectedItemIndex}`}
                  checked={selectedItem.answerIndex === inputIndex}
                  onChange={() => handleAnswerSelect(selectedItemIndex, inputIndex)}
                  className="mr-2"
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
                    placeholder="Option Text"
                    className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
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
                    className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
                  />
                )}
                {selectedItem.type === "both" && (
                  <div className="flex gap-2">
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
                      placeholder="Option Text"
                      className="flex-1 p-2 border border-gray-300 rounded-md"
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
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                )}
                <button
                  onClick={() => removeInputField(selectedItemIndex, inputIndex)}
                  className="text-red-600 ml-2"
                >
                  <RiDeleteBin6Fill />
                </button>
              </div>
            ))}
            <button
              onClick={() => addInputField(selectedItemIndex)}
              className="bg-blue-500 text-white p-2 rounded-md mb-4"
            >
              Add Option
            </button>
            {validationMessages.input && (
              <p className="text-red-500 text-sm mb-2">{validationMessages.input}</p>
            )}
            <div className="flex justify-between mb-4">
              <label htmlFor="timer" className="text-gray-700">
                Timer:
              </label>
              <select
                id="timer"
                value={selectedItem.timer}
                onChange={(e) =>
                  handleTimerChange(selectedItemIndex, e.target.value)
                }
                className="border border-gray-300 rounded-md"
              >
                <option value="off">Off</option>
                <option value="10">10 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">60 seconds</option>
              </select>
            </div>
          </div>
        )}

        <button
          onClick={createQuiz}
          className="bg-green-500 text-white p-2 rounded-md w-full"
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQnA;