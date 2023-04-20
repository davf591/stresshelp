const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// @desc    Login user
// @route   POST /auth/login
router.post('/login', userController.loginUser);

// @desc    Signup user
// @route   POST /auth/signup
router.post('/signup', userController.signupUser);

// @desc    Logout user
// @route   GET /auth/logout
router.get('/logout', (req, res, next) => {
  res.redirect('/');
});

module.exports = router;
