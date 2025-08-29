const { validationResult } = require('express-validator');
const User = require('../models/user');

const ApproveEntry = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {hallticketno}= req.query;
    try{
        const user = await User.findOne({hallticketno});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.entry= "true";
        await user.save();
        return res.json({ success: true, message: "Entry approved" });
    }
    catch(error){
        return res.status(500).json({ error: 'Server error' });
    }
};
module.exports={ApproveEntry};