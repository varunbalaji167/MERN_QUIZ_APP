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
      newItems[selectedItemIndex].inputs = newItems[selectedItemIndex].inputs.map(() => ({
        text: "",
        imageUrl: "",
      }));
    } else {
      newItems[selectedItemIndex].inputs = newItems[selectedItemIndex].inputs.map(() => ({
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

    const allQuestionsFilled = items.every((item) => item.question.trim() !== "");
    const allInputsFilled = items.every((item) =>
      item.inputs.every(
        (input) =>
          input.text.trim() !== "" &&
          (item.type !== "both" || input.imageUrl.trim() !== "")
      )
    );

    if (!allQuestionsFilled) {
      newValidationMessages.question = "Please fill in the question for every item.";
    }

    if (!allInputsFilled) {
      newValidationMessages.input = "Please fill in all input fields for every item.";
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
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-4">Create Poll</h2>

        <div className="items-container mb-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col w-full">
              {items.map((item, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <button
                    onClick={() => handleItemClick(index)}
                    className={`item-button px-3 py-2 rounded-l-lg border ${
                      index === selectedItemIndex ? "bg-blue-500 text-white" : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                  <button
                    className="ml-2 bg-red-500 text-white p-2 rounded-lg"
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
                className="bg-green-500 text-white p-2 rounded-lg ml-2"
              >
                Add Item
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
              onChange={(e) => handleQuestionChange(selectedItemIndex, e.target.value)}
              placeholder="Poll question"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            />

            <div className="flex justify-between mb-2">
              <h3 className="text-gray-700">Option type</h3>
              <div>
                <label className="mr-2">
                  <input
                    type="radio"
                    name="inputType"
                    checked={selectedItem.type === "text"}
                    onChange={() => handleTypeChange("text")}
                  />
                  Text
                </label>
                <label className="mr-2">
                  <input
                    type="radio"
                    name="inputType"
                    checked={selectedItem.type === "imageUrl"}
                    onChange={() => handleTypeChange("imageUrl")}
                  />
                  Image URL
                </label>
                <label>
                  <input
                    type="radio"
                    name="inputType"
                    checked={selectedItem.type === "both"}
                    onChange={() => handleTypeChange("both")}
                  />
                  Both
                </label>
              </div>
            </div>

            {selectedItem.inputs.map((input, inputIndex) => (
              <div className="flex items-center mb-2" key={inputIndex}>
                {selectedItem.type === "text" && (
                  <input
                    type="text"
                    value={input.text}
                    onChange={(e) =>
                      handleInputChange(selectedItemIndex, inputIndex, "text", e.target.value)
                    }
                    placeholder="Text"
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
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
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                  />
                )}

                {selectedItem.type === "both" && (
                  <div className="flex justify-between space-x-2">
                    <input
                      type="text"
                      value={input.text}
                      onChange={(e) =>
                        handleInputChange(selectedItemIndex, inputIndex, "text", e.target.value)
                      }
                      placeholder="Text"
                      className="flex-1 p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={input.imageUrl}
                      onChange={(e) =>
                        handleInputChange(selectedItemIndex, inputIndex, "imageUrl", e.target.value)
                      }
                      placeholder="Image URL"
                      className="flex-1 p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                )}

                {inputIndex >= 2 && (
                  <button
                    onClick={() => removeInputField(selectedItemIndex, inputIndex)}
                    className="ml-2 text-red-500"
                  >
                    <RiDeleteBin6Fill />
                  </button>
                )}
              </div>
            ))}

            {selectedItem.inputs.length < 4 && (
              <button
                className="bg-blue-500 text-white p-2 rounded-lg"
                onClick={() => addInputField(selectedItemIndex)}
              >
                Add Option
              </button>
            )}

            <div className="mt-4">
              <h4 className="text-gray-700">Set Timer</h4>
              <div className="flex space-x-2">
                {["off", "5sec", "10sec"].map((timer) => (
                  <button
                    key={timer}
                    className={`flex-1 p-2 rounded-lg ${
                      selectedItem.timer === timer ? "bg-green-500 text-white" : "bg-gray-300"
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

        <div className="flex justify-between mt-6">
          <button
            className="bg-red-500 text-white p-2 rounded-lg"
            onClick={() => navigate(`/analytics/${userId}`)}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white p-2 rounded-lg"
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