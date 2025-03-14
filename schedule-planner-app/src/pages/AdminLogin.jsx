import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import a2kLogo from "../assets/a2klogo.png";  // Top-left logo
import flexiSchedLogo from "../assets/logo.png";  // Centered above form
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);

    
    const {user, loading, error, dispatch} = useContext(AuthContext)

  // Function to validate form inputs
  const validateForm = (email, password) => {
    if (!email.trim() && !password.trim()) {
      return "Email and Password are required.";
    }
    if (!email.trim()) {
      return "Email is required.";
    }
    if (!email.includes("@")) {
      return "Valid email is required.";
    }
    if (!password.trim()) {
      return "Password is required.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    return "";
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"})
    try {

      const res = await axios.post(
        "http://localhost:4000/api/auth/login/admin", 
        { email, password },
        { withCredentials: true } // Ensures the cookie is stored
    );

      dispatch({type: "LOGIN_SUCCESS", payload: res.data})
      localStorage.setItem("accessToken", res.data.accessToken); // Save token
      navigate("/admin/homepage")
      localStorage.setItem('userId', res.data.user._id);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid credentials";
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
      setEmail("")
      setPassword("")
    }
  };

  
  useEffect(() => {
  }, [user]); // Logs user only when it changes

  return (
    <div className="flex min-h-screen bg-white relative">
      {/* Top-left A2K logo */}
      <img src={a2kLogo} alt="A2K Logo" className="absolute top-6 left-8 w-32" />

      {/* Centered Login Box */}
      <div className="flex flex-col items-center justify-center w-full">
        {/* FlexiSched Logo (above login form) */}
        <img src={flexiSchedLogo} alt="FlexiSched Logo" className="w-32 mb-4 h-25" />

        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-6">
            Admin Login
          </h3>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="***********"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
            </div>

            {/* Login Button */}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded flex justify-center items-center"
                onClick={handleSubmit}
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span>
                ) : (
                  "Login"
                )}
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
