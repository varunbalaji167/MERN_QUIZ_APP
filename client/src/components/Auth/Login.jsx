// //src/components/Auth/Login.jsx
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { login } from "../../api/authApi";
// import { toast } from "react-toastify";
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false); // State for showing password

//   const validate = () => {
//     const newErrors = {};

//     if (!email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!password) newErrors.password = "Password is required";

//     return newErrors;
//   };

//   const handleSubmit = async () => {
//     const newErrors = validate();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const response = await login({ email, password });

//       console.log('Login Response:', response);

//       if (response.status === 200) {
//         localStorage.setItem("user", response.data.user.username);
//         localStorage.setItem("userId", response.data.user._id); 
//         localStorage.setItem("token", response.data.token);
//         toast.success("Logged In successfully!");

//         navigate(`/analytics/${response.data.user._id}`);
//       } else {
//         toast.error(response.error || "Login failed");
//       }
//     } catch (error) {
//       console.log('Login Error:', error);
//       toast.error("An unexpected error occurred");
//     }
//   };



//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-1">Email</label>
//           <div className="flex items-center border rounded-lg border-gray-300">
//             <FaEnvelope className="text-gray-500 mx-3" />
//             <input
//               className={`flex-1 p-2 rounded-lg outline-none ${errors.email ? "border-red-500" : "border-gray-300"}`}
//               type="email"
//               placeholder="Enter your Email"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 setErrors((prev) => ({ ...prev, email: "" }));
//               }}
//             />
//           </div>
//           {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-semibold mb-1">Password</label>
//           <div className="flex items-center border rounded-lg border-gray-300">
//             <FaLock className="text-gray-500 mx-3" />
//             <input
//               className={`flex-1 p-2 rounded-lg outline-none ${errors.password ? "border-red-500" : "border-gray-300"}`}
//               type={showPassword ? "text" : "password"} // Toggle password visibility
//               placeholder="Password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 setErrors((prev) => ({ ...prev, password: "" }));
//               }}
//             />
//             {/* Toggle Password Visibility Icon */}
//             <button type="button" onClick={() => setShowPassword(!showPassword)} className="mr-3">
//               {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
//             </button>
//           </div>
//           {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
//         </div>

//         <button
//           className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition duration-200 font-bold"
//           onClick={handleSubmit}
//         >
//           Login
//         </button>

//         <div className="mt-4 text-center">
//           <span className="text-sm">
//             Don't have an account?{" "}
//             <Link to="/auth/signup" className="text-blue-500 font-semibold hover:underline">
//               Register
//             </Link>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

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

      console.log('Login Response:', response);

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
      console.log('Login Error:', error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}> {/* Form element to manage submission */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <div className="flex items-center border rounded-lg border-gray-300">
              <FaEnvelope className="text-gray-500 mx-3" />
              <input
                className={`flex-1 p-2 rounded-lg outline-none ${errors.email ? "border-red-500" : "border-gray-300"}`}
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" })); // Clear email error on change
                }}
              />
            </div>
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">Password</label>
            <div className="flex items-center border rounded-lg border-gray-300">
              <FaLock className="text-gray-500 mx-3" />
              <input
                className={`flex-1 p-2 rounded-lg outline-none ${errors.password ? "border-red-500" : "border-gray-300"}`}
                type={showPassword ? "text" : "password"} // Toggle password visibility
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" })); // Clear password error on change
                }}
              />
              {/* Toggle Password Visibility Icon */}
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="mr-3">
                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </button>
            </div>
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>

          <button
            type="submit" // Change to type="submit" for form behavior
            className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition duration-200 font-bold"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-blue-500 font-semibold hover:underline">
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;