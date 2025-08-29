const express = require('express');
const router = express.Router();
const { CheckEntry } = require('../controllers/passverificationcontroller');


// Protected route for verifying a pass
router.get('/verify',CheckEntry);

module.exports = router;
