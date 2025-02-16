import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google"; // Redirect to backend for Google Auth
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our App</h1>
      {user ? (
        <a
          href="/dashboard"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Go to Dashboard
        </a>
      ) : (
        <button
          onClick={handleLogin}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
            alt="Google Logo"
            className="w-6 h-6 mr-2"
          />
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Home;
