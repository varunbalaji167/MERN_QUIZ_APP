// src/components/Auth/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api/authApi";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State for showing password

  const validate = () => {
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) newErrors.password = "Password is required";

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
      const response = await login({ email, password });

      console.log("Login Response:", response);

      if (response.status === 200) {
        localStorage.setItem("user", response.data.user.username);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("token", response.data.token);
        toast.success("Logged In successfully!");

        navigate(`/analytics/${response.data.user._id}`);
      } else {
        toast.error(response.error || "Login failed");
      }
    } catch (error) {
      console.log("Login Error:", error);
      toast.error("An unexpected error occurred");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-teal-400">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-10">
          Welcome Back!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
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
                placeholder="Enter your Email"
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
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
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

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-gray-50 font-bold py-3 rounded-lg w-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-purple-500 font-semibold hover:underline"
            >
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
