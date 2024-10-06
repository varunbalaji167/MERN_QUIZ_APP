// src/componnets/Auth/Signup.jsx
import React, { useState } from "react";
import { signup } from "../../api/authApi";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!username) newErrors.username = "Username is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const newErrors = validate();
    setErrors(newErrors); // Update errors state immediately

    if (Object.values(newErrors).some((error) => error)) {
      return; // Exit early if there are validation errors
    }

    try {
      const response = await signup({
        username,
        email,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
        toast.success(
          response.data.message ||
            "Registration successful! Redirecting to login..."
        );
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      } else {
        toast.error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.log("Signup Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-teal-400">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-10">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-teal-600 mb-2">
              Username
            </label>
            <div className="flex items-center border rounded-lg border-gray-300 bg-gray-50 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-300">
              <FaUser className="text-teal-500 mx-3" />
              <input
                className={`flex-1 p-3 rounded-lg outline-none text-gray-700 bg-transparent focus:ring-0 ${
                  errors.username ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors((prev) => ({ ...prev, username: "" }));
                }}
              />
            </div>
            {errors.username && (
              <div className="text-red-500 text-xs mt-1">{errors.username}</div>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-teal-600 mb-2">
              Email
            </label>
            <div className="flex items-center border rounded-lg border-gray-300 bg-gray-50 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-300">
              <FaEnvelope className="text-teal-500 mx-3" />
              <input
                className={`flex-1 p-3 rounded-lg outline-none text-gray-700 bg-transparent focus:ring-0 ${
                  errors.email ? "border-red-500" : ""
                }`}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
            </div>
            {errors.email && (
              <div className="text-red-500 text-xs mt-1">{errors.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-teal-600 mb-2">
              Password
            </label>
            <div className="flex items-center border rounded-lg border-gray-300 bg-gray-50 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-300">
              <FaLock className="text-teal-500 mx-3" />
              <input
                className={`flex-1 p-3 rounded-lg outline-none text-gray-700 bg-transparent focus:ring-0 ${
                  errors.password ? "border-red-500" : ""
                }`}
                type={showPassword ? "text" : "password"} // Toggle password visibility
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mr-3 focus:outline-none"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-teal-500" />
                ) : (
                  <FaEye className="text-teal-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500 text-xs mt-1">{errors.password}</div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-teal-600 mb-2">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-lg border-gray-300 bg-gray-50 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-300">
              <FaLock className="text-teal-500 mx-3" />
              <input
                className={`flex-1 p-3 rounded-lg outline-none text-gray-700 bg-transparent focus:ring-0 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="mr-3 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-teal-500" />
                ) : (
                  <FaEye className="text-teal-500" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-gray-50 font-bold py-3 rounded-lg w-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-purple-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
