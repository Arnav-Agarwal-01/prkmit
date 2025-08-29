const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authcontroller');
const checkController = require('../controllers/checkcontroller');
const router = express.Router();


router.post('/login', [
  check('hallticketno', 'Hall ticket number must be 10 alphanumeric characters').isLength({ min: 10, max: 10 }),
  check('parentphone', 'Parent phone number must be exactly 4 digits').isLength({ min: 4, max: 4 })
], authController.login
);

router.post('/check', [
  check('hallticketno', 'Hall ticket number must be 10 alphanumeric characters').isLength({ min: 10, max: 10 }),
], checkController.check
);


router.post('')




module.exports = router;
