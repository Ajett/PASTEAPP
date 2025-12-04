



import { useState } from "react";
import { registerAPI } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await registerAPI({ name, email, password });
      toast.success("Registered. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <form onSubmit={handleRegister} className="w-full max-w-md bg-[#111] p-6 rounded-xl border border-gray-800 text-gray-300">
        <h2 className="text-2xl font-semibold mb-4 text-white">Register</h2>
        <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="w-full p-3 rounded bg-[#1b1b1b] mb-3"/>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 rounded bg-[#1b1b1b] mb-3"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-3 rounded bg-[#1b1b1b] mb-3"/>
        <button className="w-full py-3 bg-green-600 rounded">Create account</button>
        <p className="text-sm mt-4">Already have an account? <a href="/login" className="text-blue-400">Login</a></p>
      </form>
    </div>
  );
};

export default Register;

