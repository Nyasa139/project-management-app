import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      form
    );

    // ✅ Clear old data first
    localStorage.clear();

    // ✅ Store fresh login data
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/dashboard");

  } catch (err) {
    setMessage("❌ " + (err.response?.data?.message || "Server error"));
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-white p-8 w-96 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>

        <input
          className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 transition"
        >
          Login
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-red-500">{message}</p>
        )}

        <p className="text-center text-sm">
  Don't have an account?{" "}
  <span
    className="text-indigo-600 cursor-pointer"
    onClick={() => navigate("/register")}
  >
    Sign Up
  </span>
</p>

      </div>
    </div>
  );
}
