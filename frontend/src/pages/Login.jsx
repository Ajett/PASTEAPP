


import { useState } from "react";
import { loginAPI } from "../api/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await loginAPI({ email, password });
      dispatch(loginSuccess(res.data));
      toast.success("Logged in");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-[#111] p-6 rounded-xl border border-gray-800 text-gray-300">
        <h2 className="text-2xl font-semibold mb-4 text-white">Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 rounded bg-[#1b1b1b] mb-3"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-3 rounded bg-[#1b1b1b] mb-3"/>
        <div className="flex items-center justify-between">
          <button className="px-4 py-2 bg-blue-600 rounded">Login</button>
          <Link to="/forgot" className="text-sm text-gray-400">Forgot?</Link>
        </div>
        <p className="text-sm mt-4">No account? <Link to="/register" className="text-blue-400">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
