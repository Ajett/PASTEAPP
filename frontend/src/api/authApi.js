
import axios from "axios";
const API = "http://localhost:5000/api/auth";

export const registerAPI = (data) => axios.post(`${API}/register`, data);
export const loginAPI = (data) => axios.post(`${API}/login`, data);
export const sendOtpAPI = (email) => axios.post(`${API}/forgot-password`, { email });
export const resetPasswordAPI = (email, otp, newPassword) =>
  axios.post(`${API}/reset-password`, { email, otp, newPassword });
