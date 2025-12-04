



import { useState } from "react";
import { resetPasswordAPI } from "../api/authApi";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const [email] = useState(loc.state?.email || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  async function handleReset(e) {
    e.preventDefault();
    try {
      await resetPasswordAPI(email, otp, newPassword);
      toast.success('Password reset. Login now.');
      navigate('/login');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Reset failed');
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <form onSubmit={handleReset} className="w-full max-w-md bg-[#111] p-6 rounded-xl border border-gray-800 text-gray-300">
        <h2 className="text-2xl font-semibold mb-4 text-white">Reset Password</h2>
        <input type="text" placeholder="Email" value={email} readOnly className="w-full p-3 rounded bg-[#1b1b1b] mb-3"/>
        <input type="text" placeholder="OTP" value={otp} onChange={e=>setOtp(e.target.value)} className="w-full p-3 rounded bg-[#1b1b1b] mb-3"/>
        <input type="password" placeholder="New password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="w-full p-3 rounded bg-[#1b1b1b] mb-3"/>
        <button className="w-full py-3 bg-green-600 rounded">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;

