// src/components/Quiz/CreatePoll.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create_Poll } from "../../api/pollApi";
import { toast } from "react-toastify";
import { RiDeleteBin6Fill } from "react-icons/ri";

const CreatePoll = ({ quizId }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [items, setItems] = useState([
    {
      name: "Item 1",
      question: "",
      type: "text",
      inputs: [
        { text: "", imageUrl: "" },
        { text: "", imageUrl: "" },
      ],
      timer: "off",
    },
  ]);

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

  const handleTypeChange = (type) => {
    const newItems = [...items];
    newItems[selectedItemIndex].type = type;

    if (type === "both") {
      newItems[selectedItemIndex].inputs = newItems[
        selectedItemIndex
      ].inputs.map(() => ({
        text: "",
        imageUrl: "",
      }));
    } else {
      newItems[selectedItemIndex].inputs = newItems[
        selectedItemIndex
      ].inputs.map(() => ({
        text: "",
      }));
    }

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
      timer: "off",
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleTimerChange = (index, timerValue) => {
    const newItems = [...items];
    newItems[index].timer = timerValue;
    setItems(newItems);
  };

  const createPoll = async () => {
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
        "Please fill in all input fields for every item.";
    }

    setValidationMessages(newValidationMessages);

    if (allQuestionsFilled && allInputsFilled) {
      const response = await create_Poll(items, quizId, token);
      console.log(items);

      if (response.status === 201) {
        toast.success("Quiz created successfully!");
        navigate(`/share_quiz/${userId}/${quizId}`);
      } else {
        console.log("Failed to create poll", response.error);
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

  const selectedItem = items[selectedItemIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-teal-600">
          Create Poll
        </h2>

        <div className="items-container mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col w-full">
              {items.map((item, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <button
                    onClick={() => handleItemClick(index)}
                    className={`item-button px-4 py-2 rounded-l-lg border ${
                      index === selectedItemIndex
                        ? "bg-teal-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                  <button
                    className="ml-2 bg-red-500 text-white p-2 rounded-lg flex items-center justify-center"
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
                className="bg-teal-500 text-white p-2 rounded-lg ml-2"
              >
                Add question
              </button>
            )}
          </div>
          <p className="text-gray-500 text-sm">Max 5 questions</p>
        </div>

        {selectedItem && (
          <div>
            <input
              type="text"
              value={selectedItem.question}
              onChange={(e) =>
                handleQuestionChange(selectedItemIndex, e.target.value)
              }
              placeholder="Poll question"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />

            <div className="flex justify-between mb-4">
              <h3 className="text-gray-700 text-lg font-semibold">
                Option type
              </h3>
              <div className="flex space-x-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="inputType"
                    checked={selectedItem.type === "text"}
                    onChange={() => handleTypeChange("text")}
                    className="mr-1"
                  />
                  Text
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="inputType"
                    checked={selectedItem.type === "imageUrl"}
                    onChange={() => handleTypeChange("imageUrl")}
                    className="mr-1"
                  />
                  Image URL
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="inputType"
                    checked={selectedItem.type === "both"}
                    onChange={() => handleTypeChange("both")}
                    className="mr-1"
                  />
                  Both
                </label>
              </div>
            </div>

            {selectedItem.inputs.map((input, inputIndex) => (
              <div className="flex items-center mb-4" key={inputIndex}>
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
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
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
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                )}

                {selectedItem.type === "both" && (
                  <div className="flex justify-between space-x-2">
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
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
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
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                )}

                {inputIndex >= 2 && (
                  <button
                    onClick={() =>
                      removeInputField(selectedItemIndex, inputIndex)
                    }
                    className="ml-2 text-red-500"
                  >
                    <RiDeleteBin6Fill />
                  </button>
                )}
              </div>
            ))}

            {selectedItem.inputs.length < 4 && (
              <button
                className="bg-teal-500 text-white p-2 rounded-lg"
                onClick={() => addInputField(selectedItemIndex)}
              >
                Add Option
              </button>
            )}

            <div className="mt-6">
              <h4 className="text-gray-700 text-lg font-semibold">Set Timer</h4>
              <div className="flex space-x-2">
                {["off", "5sec", "10sec"].map((timer) => (
                  <button
                    key={timer}
                    className={`flex-1 p-2 rounded-lg ${
                      selectedItem.timer === timer
                        ? "bg-teal-500 text-white"
                        : "bg-gray-300"
                    }`}
                    onClick={() => handleTimerChange(selectedItemIndex, timer)}
                  >
                    {timer === "off" ? "Off" : timer}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            className="bg-red-500 text-white p-3 rounded-lg flex-1 mr-2"
            onClick={() => navigate(`/analytics/${userId}`)}
          >
            Cancel
          </button>
          <button
            className="bg-teal-600 text-white p-3 rounded-lg flex-1 ml-2"
            onClick={createPoll}
          >
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
