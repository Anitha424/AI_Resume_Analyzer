import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/register", user);

      toast.success(res.data.message || "Registration Successful");

      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.detail || "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">

      <div className="w-[450px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10">

        <h1 className="text-4xl font-bold text-white text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-300 mt-3 mb-8">
          Register to continue
        </p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            className="w-full h-14 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 px-5 mb-5 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full h-14 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 px-5 mb-5 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="w-full h-14 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 px-5 mb-8 outline-none"
          />

          <button
            type="submit"
            className="w-full h-14 rounded-xl border border-white/30 bg-white/10 text-white text-lg font-semibold hover:bg-white/20 transition"
          >
            Register
          </button>

        </form>

        <p className="text-center text-gray-300 mt-8">
          Already have an account?

          <Link
            to="/"
            className="ml-2 text-blue-300 hover:text-white font-semibold"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;