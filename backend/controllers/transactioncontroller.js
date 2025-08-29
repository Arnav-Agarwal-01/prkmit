const crypto = require('crypto');
const QRCode = require('qrcode');
const User = require('../models/user');

// Controller function to handle the transaction and QR code generation
const submitTransaction = async (req, res) => {
    const { transactionid } = req.body;
    // console.log(req.user);
    hallticketno = req.user.hallticketno;
    // console.log(hallticketno, transactionid);
    try {
        // Step 1: Find the user by hallticketno in the database
        const user = await User.findOne({ hallticketno });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Step 2: Encrypt the hallticketno and firstname fetched from the database
        const dataToEncrypt = `${user.hallticketno}-${user.firstname}`;
        
        const encryptionKey = 'iamgodandiwillbeiamgodandiwillbe'; // Replace with your secure key (16, 24, or 32 characters)
    
        const iv = crypto.randomBytes(16); // Generate a random initialization vector (IV)
      
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'utf8'), iv);
       
        let encrypted = cipher.update(dataToEncrypt, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const encryptedData = `${iv.toString('hex')}:${encrypted}`; // Include IV with encrypted data
        
        // Step 3: Generate a QR code with the encrypted data
        const qrCodeData = await QRCode.toDataURL(encryptedData);
        
        // Step 4: Update the user with the transactionid and qrCode
        if (!transactionid || transactionid.length < 12) {
            return res.status(400).json({ error: 'Invalid or missing transaction ID' });
        }
        user.transactionid = transactionid;
        user.qrcode = qrCodeData;
        user.entry = 'false';
        

        await user.save();

        // Step 5: Send the QR code as a response
        res.json({ message: 'Transaction saved and QR code generated', qrCode: qrCodeData });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Failed to save transaction or generate QR code' });
    }
};

const getQR = async (req, res) => {
    hallticketno = req.user.hallticketno;
    try {
        const user = await User.findOne({ hallticketno }).select('qrcode');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get QR code' });
    }
}

module.exports = { submitTransaction, getQR };
