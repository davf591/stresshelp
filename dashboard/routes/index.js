const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const userRoutes = require('./user');

const Story = require('../models/StoryModel');

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

// @desc    Signup page
// @route   GET /signup
router.get('/signup', ensureGuest, (req, res) => {
  res.render('signup', {
    layout: 'login',
  });
});
router.get('/login', ensureGuest, (req, res) => {
  res.render('loginForm', {
    layout: 'login',
  });
});
router.use('/user', userRoutes);

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    // const stories = await Story.find({ user: req.user.id }).lean()
    const stories = await Story.find({}).lean();
    res.render('dashboard', {
      // name: req.user.firstName,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;
