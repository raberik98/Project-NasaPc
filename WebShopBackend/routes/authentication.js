const express = require('express');
const router = express.Router();

// import authentication controller
const authController = require('../controllers/authentication');

// register a new user
router.post('/api/register', authController.register);

// verify registration
router.get('/api/verify-account/:token', authController.verifyRegistration);

// session check
router.get('/api/session', authController.getSession);

// login
router.post('/api/login', authController.login)

// logout
router.get('/api/logout', authController.logout)

module.exports = router;
