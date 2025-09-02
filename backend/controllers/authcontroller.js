const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// User login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract and sanitize inputs
  let { hallticketno, parentphone } = req.body;
  hallticketno = String(hallticketno);
  parentphone = String(parentphone);
  
  try {
    // Find the user by hallticket number
    const user = await User.findOne({ hallticketno });
    if (!user) {
      return res.status(400).json({ msg: 'User Not Found' });
    }
    const batch=[1,2,3,4]; //change here
        if(!batch.includes(user.currentyear)){
            return res.status(400).json({ msg: 'Passes for your year are currently on hold' });
        }
    // Check if the last 4 digits of the parent's phone number match
    const lastFourDigits = user.parentphone.slice(-4);
    if (lastFourDigits !== parentphone) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create and assign JWT token
    const payload = { user: { id: user.id, hallticketno: user.hallticketno } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set JWT as an HttpOnly, Secure cookie
    // res.json('token', token, {
    //   httpOnly: true, // Prevent JavaScript access to the cookie
    //   secure: process.env.NODE_ENV === 'production', // Only set 'secure' to true in production
    //   maxAge: 3600000, 
    //   sameSite: 'none', 
    // });  
    
    res.status(200).json({ msg: 'Login successful', token}); // Optionally send a success message
  } catch (error) {
    // console.error(error);
    res.status(500).send('Server Error');
  }
};
