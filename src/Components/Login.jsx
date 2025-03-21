import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useLogin } from "../hooks/userLogin";

export default function Login() {


  const [name, setname] = useState("");

  const [password, setPass] = useState("");

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      console.log(name , password);
      await login(name, password);
      console.log("Login successful");
      
      
  };




  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r">
      <div className="w-full max-w-md bg-gray-900 shadow-xl rounded-lg p-8 ">
        <h2 className="text-2xl font-bold text-white text-center mb-6">🔐 Login</h2>
        
        <form className="space-y-4">
          {/* name Input */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="name"
              placeholder="Enter your name"
              className="w-full pl-10 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setname(e.target.value)}
              value={name}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full pl-10 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPass(e.target.value)}
              value={password}
            />
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold transition-all" onClick={ (e)=>handleSubmit(e)} >
            Login
          </button>

          {/* Additional Links */}
          <div className="text-center text-gray-400 text-sm mt-2">
            <a href="#" className="hover:text-blue-400">Forgot password?</a> | 
            <a href="#" className="hover:text-blue-400 ml-2">Create an account</a>
          </div>
        </form>
      </div>
    </div>
  );
}
