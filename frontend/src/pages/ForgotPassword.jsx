


import { useState } from "react";
import { sendOtpAPI } from "../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleSendOtp(e) {
    e.preventDefault();
    try {
      await sendOtpAPI(email);
      toast.success("OTP sent to email");
      navigate('/reset', { state: { email } });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <form onSubmit={handleSendOtp} className="w-full max-w-md bg-[#111] p-6 rounded-xl border border-gray-800 text-gray-300">
        <h2 className="text-2xl font-semibold mb-4 text-white">Forgot Password</h2>
        <input type="email" placeholder="Your registered email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 rounded bg-[#1b1b1b] mb-3"/>
        <button className="w-full py-3 bg-indigo-600 rounded">Send OTP</button>
      </form>
    </div>
  );
};

export default ForgotPassword;

