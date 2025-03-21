import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useLogin } from "../hooks/userLogin";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(name, password);
      navigate("/dashboard"); // Redirect to dashboard/home
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div
      className={`flex flex-col lg:flex-row items-center justify-between bg-base-300 my-30 ${
        theme === "light" ? "bg-base-300 text-black" : "bg-gray-900 text-white"
      }`}
    >
      {/* Left: Login Form */}
      <div className="lg:w-1/2 w-full flex justify-center bg-base-300">
        <div className="w-full max-w-sm bg-white-900 shadow-2xl rounded-2xl p-8 border border-gray-700 bg-white">
          <h2 className={`text-3xl pr-5 font-semibold ${theme === "light" ? 'text-gray-900':'text-gray-100'} text-center mb-6`}>🔐 Log in</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2 bg-gray-800 text-white">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="grow bg-transparent focus:outline-none"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </label>
            </div>

      
            {/* Password Input */}
            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2 bg-gray-800 text-white">
                <FaLock className="text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="grow bg-transparent focus:outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </label>
            </div>

            {/* Login Button */}
            <button
              className="btn btn-primary w-full text-lg font-semibold transition-all hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Additional Links */}
          <div className="text-center text-gray-400 text-sm mt-4">
            <a href="#" className="hover:text-blue-400">
              Forgot password?
            </a>{" "}
            |
            <a href="/create" className="hover:text-blue-400 ml-2">
              Create an account
            </a>
          </div>
        </div>
      </div>

      {/* Right: Image and Info */}
      <div className="lg:w-1/2 w-full flex flex-col items-center text-center mt-10 lg:mt-0 px-6 bg-base-300 pr-35">
        {/* <h2 className={`text-3xl font-bold ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"}}`> */}

        <h3
          className={`text-2xl mt-0 font-bold ${
            theme === "light" ? "bg-base-300 text-black" : "bg-gray-900 text-white"
          }`}
        >
          📄 What the Tool Does
        </h3>
        <p className={`text-gray-800 mt-2 ${theme === "light" ? "bg-base-300 text-black" : "bg-gray-900 text-white"}`}>
          Our AI-powered Documentation Generator simplifies code
          documentation, making it easy to maintain and share project knowledge.
        </p>

        <h3
          className={`text-2xl mt-6 font-bold ${
            theme === "light" ? "bg-base-300 text-black" : "bg-gray-900 text-white"
          }`}
        >
          ⚡ How It Benefits Users
        </h3>
        <p className={`text-gray-800 mt-2 ${theme === "light" ? "bg-base-300 text-black" : "bg-gray-900 text-white"}`}>
          Save hours of manual documentation effort, ensure consistency, and
          improve collaboration across teams.
        </p>

         <h3 className={`text-2xl mt-6 font-bold ${theme === "light" ? "bg-base-300 text-black" : "bg-gray-900 text-white"}`}>
          🚀 Get Started Quickly
        </h3>
        <p className={`text-gray-800 mt-2 ${theme === "light" ? "bg-base-300 text-black" : "bg-gray-900 text-white"}`}>
          Sign up now and start generating high-quality documentation with just
          a few clicks!
        </p>
      </div>
    </div>
  );
}
