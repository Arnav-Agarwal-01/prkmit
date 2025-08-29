const express = require('express');
const router = express.Router();
const { ApproveEntry } = require('../controllers/entrycontroller');


// Protected route for approving entry through pass
router.post('/approve',ApproveEntry);

module.exports = router;