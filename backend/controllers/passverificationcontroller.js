const crypto = require('crypto');
const User = require('../models/user');
const { validationResult } = require('express-validator');

const CheckEntry = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { encryptedData } = req.query;
    if(!encryptedData){
        return res.status(404).json({ error: 'Wrong QR' });
    }
    let decrypted;
    // Decrypting the data to get rollnumber and name
    try{
        try {
            const parts = encryptedData.split(':');
            const iv = Buffer.from(parts[0], 'hex'); 
            const encryptedText = parts[1]; 
            const encryptionKey=process.env.ENCRYPTION_KEY;
            const decipher = crypto.createDecipheriv(
              'aes-256-cbc',
              Buffer.from(encryptionKey, 'utf8'), 
              iv
            );
        
            decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
          } catch (error) {
            // console.error('Decryption failed');
            return res.status(500).json({ error: 'Invalid QR' });
        }
        //Checking mongo for the entry of the pass holder
        const arr = decrypted.split("-");
        const hallticketno= arr[0];
        const user = await User.findOne({hallticketno});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const entry = user.entry;
        if(!entry){
            return res.status(404).json({ error: 'Invalid Pass' });
        }
        return res.json({ entry: user.entry , hallticketno: user.hallticketno});
    }
    catch(error){
        return res.status(500).json({ error: error });
    }
};

module.exports={CheckEntry};