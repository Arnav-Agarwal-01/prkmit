//here i need a code for verifying the token 

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.verify = async function (req, res, next) {
    
    const token = req.header('x-auth-token');
    
    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    
    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
    }