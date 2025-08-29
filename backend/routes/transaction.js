const express = require('express');
const router = express.Router();
const { submitTransaction,getQR } = require('../controllers/transactioncontroller');


// Protected route for submitting transaction
router.post('/submit',submitTransaction);
router.get('/getQR',getQR);

module.exports = router;