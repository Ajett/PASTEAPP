import React, { useState } from "react";
import { verifyOtpAPI } from "../api/authApi";
import { useSearchParams } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [params] = useSearchParams();
  const email = params.get("email");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await verifyOtpAPI(email, otp);
      alert("OTP verified!");

      window.location.href = `/reset-password?email=${email}&otp=${otp}`;
    } catch (err) {
      alert("Invalid OTP");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-[#111] text-white rounded-lg">
      <h2 className="text-xl mb-4">Verify OTP</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="p-2 rounded bg-black border border-gray-700"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="bg-green-600 p-2 rounded">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOtp;
