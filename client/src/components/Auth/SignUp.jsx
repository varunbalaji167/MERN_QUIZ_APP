// //src/componnets/Auth/Signup.jsx
// import React, { useState } from "react";
// import { signup } from "../../api/authApi";
// import { toast } from "react-toastify";
// import { useNavigate, Link } from "react-router-dom"; 
// import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

// const SignUp = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false); // State for showing password
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password
//   const navigate = useNavigate();

//   const validate = () => {
//     const newErrors = {};
//     if (!username) newErrors.username = "Username is required";
//     if (!email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!password) newErrors.password = "Password is required";
//     if (!confirmPassword) {
//       newErrors.confirmPassword = "Confirm Password is required";
//     } else if (password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords must match";
//     }
//     return newErrors;
//   };

//   const handleSubmit = async () => {
//     const newErrors = validate();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const response = await signup({
//         username,
//         email,
//         password,
//         confirmPassword,
//       });

//       console.log("Signup Response:", response); 

//       if (response.status === 201) {
//         toast.success(response.data.message || "Registration successful! Redirecting to login...");
//         setTimeout(() => {
//           navigate("/auth/login");
//         }, 2000); 
//       }
//     } catch (error) {
//       toast.error("An error occurred. Please try again.");
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

//         {/* Username Field */}
//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-1">Username</label>
//           <div className="flex items-center border rounded-lg border-gray-300">
//             <FaUser className="text-gray-500 mx-3" />
//             <input
//               className={`flex-1 p-2 rounded-lg outline-none ${errors.username ? "border-red-500" : "border-gray-300"}`}
//               type="text"
//               placeholder="Enter a name"
//               value={username}
//               onChange={(e) => {
//                 setUsername(e.target.value);
//                 setErrors((prev) => ({ ...prev, username: "" }));
//               }}
//             />
//           </div>
//           {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
//         </div>

//         {/* Email Field */}
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

//         {/* Password Field */}
//         <div className="mb-4">
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

//         {/* Confirm Password Field */}
//         <div className="mb-6">
//           <label className="block text-sm font-semibold mb-1">Confirm Password</label>
//           <div className="flex items-center border rounded-lg border-gray-300">
//             <FaLock className="text-gray-500 mx-3" />
//             <input
//               className={`flex-1 p-2 rounded-lg outline-none ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
//               type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => {
//                 setConfirmPassword(e.target.value);
//                 setErrors((prev) => ({ ...prev, confirmPassword: "" }));
//               }}
//             />
//             {/* Toggle Confirm Password Visibility Icon */}
//             <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="mr-3">
//               {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
//             </button>
//           </div>
//           {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}
//         </div>

//         <button
//           className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition duration-200 font-bold"
//           onClick={handleSubmit}
//         >
//           Sign Up
//         </button>

//         <div className="mt-4 text-center">
//           <span className="text-sm">
//             Already have an account?{" "}
//             <Link to="/auth/login" className="text-blue-500 font-semibold hover:underline">
//               Login
//             </Link>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;



// src/components/Auth/Signup.jsx
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
    const newErrors = { username: "", email: "", password: "", confirmPassword: "" };

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

      console.log("Signup Response:", response); 

      if (response.status === 201) {
        toast.success(response.data.message || "Registration successful! Redirecting to login...");
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit}> {/* Form element to manage submission */}
          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Username</label>
            <div className="flex items-center border rounded-lg border-gray-300">
              <FaUser className="text-gray-500 mx-3" />
              <input
                className={`flex-1 p-2 rounded-lg outline-none ${errors.username ? "border-red-500" : "border-gray-300"}`}
                type="text"
                placeholder="Enter a name"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors((prev) => ({ ...prev, username: "" }));
                }}
              />
            </div>
            {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
          </div>

          {/* Email Field */}
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
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
            </div>
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
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
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
              {/* Toggle Password Visibility Icon */}
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="mr-3">
                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </button>
            </div>
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">Confirm Password</label>
            <div className="flex items-center border rounded-lg border-gray-300">
              <FaLock className="text-gray-500 mx-3" />
              <input
                className={`flex-1 p-2 rounded-lg outline-none ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
              />
              {/* Toggle Confirm Password Visibility Icon */}
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="mr-3">
                {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </button>
            </div>
            {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}
          </div>

          <button
            type="submit" // Change to type="submit" for form behavior
            className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition duration-200 font-bold"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-500 font-semibold hover:underline">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;