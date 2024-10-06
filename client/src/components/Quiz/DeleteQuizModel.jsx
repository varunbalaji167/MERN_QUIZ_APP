// src/components/Quiz/DeleteQuizModel.jsx
import React from "react";
import { PiLineVerticalLight } from "react-icons/pi";

const DeleteQuizModal = ({ isOpen, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-md transition-transform transform hover:scale-105">
        <h3 className="text-xl font-bold text-center mb-4">
          Delete Quiz Confirmation
        </h3>
        <p className="text-gray-700 text-center mb-6">
          Are you sure you want to delete this quiz? This action cannot be
          undone.
        </p>

        <div className="flex justify-around items-center mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Confirm
          </button>

          <PiLineVerticalLight className="text-2xl text-gray-400" />

          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuizModal;
