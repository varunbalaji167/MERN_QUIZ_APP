import React from "react";
import { PiLineVerticalLight } from "react-icons/pi";

const DeleteQuizModel = ({ isOpen, onClose, onDelete }) => {
  const Delete = () => {
    onDelete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h3 className="text-xl font-semibold text-center">
          Are you sure you want to delete this Quiz?
        </h3>

        <div className="flex justify-around items-center mt-6">
          <button
            onClick={Delete}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Confirm
          </button>

          <PiLineVerticalLight className="text-2xl text-gray-400" />

          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuizModel;