// src/components/Quiz/QnaSubmitted.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import trophy from "../../assets/trophy.png";
import confetti from "canvas-confetti"; // Import a confetti library for celebration effect

const QnaSubmitted = ({
  correct = 0, // Default to 0 if not provided
  total = 1, // Default to 1 to avoid division by zero
  userId,
  setIsAnalytics = () => {}, // Default to empty function
}) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    setIsAnalytics(true);
    navigate(`/analytics/${userId}`);
  };

  const handleCelebration = () => {
    if (correct === total) {
      // Trigger confetti animation if the user scored full
      const end = Date.now() + 2 * 1000; // Duration of the confetti effect
      const colors = ["#bb0000", "#ffffff", "#00bb00"];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          startVelocity: 30,
          decay: 0.9,
          colors: colors,
          origin: {
            x: 0,
            // Randomize the starting position along the x-axis
            y: Math.random() * 0.3,
          },
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          startVelocity: 30,
          decay: 0.9,
          colors: colors,
          origin: {
            x: 1,
            // Randomize the starting position along the x-axis
            y: Math.random() * 0.3,
          },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  };

  // Trigger celebration effect on component mount if full score
  React.useEffect(() => {
    handleCelebration();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center bg-gray-50 rounded-lg shadow-md mx-auto w-full max-w-md">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        {correct === total
          ? "Congratulations! 🎉"
          : "Good effort! Keep trying!"}
      </h1>
      {correct === total ? (
        <img
          src={trophy}
          alt="Trophy representing achievement"
          className="w-1/2 h-auto mb-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
        />
      ) : (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6TwriJW4gQZEWIWsxuKtKwQH1LN9-ya7hgA&s"
          alt="Better luck next time"
          className="w-1/2 h-auto mb-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
        />
      )}
      <div className="font-bold text-3xl mb-4">
        <span>Your score is </span>
        <span className="text-green-600">
          {correct}/{total}
        </span>
      </div>
      <button
        onClick={handleRedirect}
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        aria-label="Go to Analytics"
      >
        Go to Analytics
      </button>
    </div>
  );
};

export default QnaSubmitted;
