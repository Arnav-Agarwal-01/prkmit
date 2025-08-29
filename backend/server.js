const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // For JWT handling
const cookieParser = require('cookie-parser'); // For parsing cookies

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000','https://www.prkmit.in'], // Change to the actual URL of your frontend
  credentials: true, // Allow credentials (cookies) to be sent
}));
app.use(helmet());
app.use(cookieParser()); // Use cookie-parser to read cookies

// Rate Limiting to Prevent Brute Force Attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 5 login attempts per window
  message: 'Too many login attempts, please try again later.',
});
app.use('/api/auth/login', loginLimiter);

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  // Get the token from the cookies (or from the Authorization header)
  const token = req.cookies.token || req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify the token
  try {
    // console.log(token);
    const decoded = jwt.verify(token.slice(7), process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Routes
app.use('/api/auth', require('./routes/auth')); // Your existing auth routes
app.use('/api/transaction',verifyToken,require('./routes/transaction')); // Your existing transaction routes
app.use('/api/passes',require('./routes/passapproval'));
app.use('/api/passes',require('./routes/passverify'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT} at http://localhost:${PORT}`));
