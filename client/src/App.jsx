// src/App.jsx
import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import CreateQuiz from "./pages/CreateQuiz";
import ShareQuiz from "./pages/ShareQuiz";
import Quiz from "./pages/Quiz";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import EditPoll from "./pages/EditPoll";
import EditQna from "./pages/EditQna";
import AttemptQuiz from "./pages/AttemptQuiz";
import Analysis from "./components/Quiz/Analysis";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAnalytics, setIsAnalytics] = useState(false); // Add state for analytics
  const userId = localStorage.getItem("userId");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={`/analytics/${userId}`} />
              ) : (
                <Login />
              )
            }
          />
          <Route path="/create_quiz/:userId" element={<CreateQuiz />} />
          <Route path="/share_quiz/:userId/:quizId" element={<ShareQuiz />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
          <Route 
            path="/analytics/:userId" 
            element={
              <Analysis 
                isAnalytics={isAnalytics} 
                setIsAnalytics={setIsAnalytics} 
              />
            } 
          />
          <Route path="/attempt_quiz/:userId" element={<AttemptQuiz />} />
          <Route path="/edit_poll/:userId/:quizId" element={<EditPoll />} />
          <Route path="/edit_qna/:userId/:quizId" element={<EditQna />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
