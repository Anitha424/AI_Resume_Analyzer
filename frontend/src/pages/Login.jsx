import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRobot } from "react-icons/fa";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login button clicked");

    if (!user.email || !user.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", user);

      console.log("Login Response:", res.data);

      localStorage.setItem("token", res.data.access_token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.detail || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-[180px] opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-[180px] opacity-30"></div>

      {/* Glass Card */}
      <div className="relative z-10 w-[390px] rounded-[30px] border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-8">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
            <FaRobot className="text-white text-3xl" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-white">
          AI Resume Analyzer
        </h1>

        <p className="text-center text-gray-300 text-base mt-2 mb-6">
          Analyze • Match • Get Hired
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            className="w-full h-14 px-6 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none backdrop-blur-md focus:border-white focus:ring-2 focus:ring-cyan-400 transition-all"
          />

          <div className="h-4"></div>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            className="w-full h-14 px-6 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none backdrop-blur-md focus:border-white focus:ring-2 focus:ring-cyan-400 transition-all"
          />

          <div className="text-right mt-4 mb-8">
            <a
              href="#"
              className="text-cyan-300 hover:text-white"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full h-16 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-2xl transition-all shadow-lg"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-300 mt-5 text-base">
          Don't have an account?

          <Link
            to="/register"
            className="ml-2 text-cyan-300 hover:text-white font-semibold"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;