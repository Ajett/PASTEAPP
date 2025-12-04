


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require("path");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "https://pasteapp-ovci.onrender.com" || 'http://localhost:5173'
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pastes', require('./routes/pasteRoutes'));

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all (Fix for Node 22 / Express 5)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port', PORT));
