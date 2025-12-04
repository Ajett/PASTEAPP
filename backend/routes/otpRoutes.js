

const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const OTP = require("../models/otpModel");
const nodemailer = require("nodemailer");

// SEND OTP
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Email not registered" });

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.resetOTP = otp;
    user.resetOTPExpire = Date.now() + 5 * 60 * 1000; // valid 5 min
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp} (valid 5 minutes)`
    });

    res.json({ message: "OTP sent successfully!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
      resetOTP: otp,
      resetOTPExpire: { $gt: Date.now() }
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    res.json({ message: "OTP verified!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
