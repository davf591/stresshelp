const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const userRoutes = require('./user');
const authRoutes = require('./auth');
const Story = require('../models/StoryModel');
const UserController = require('../controllers/userController')
const AppointmentController = require('../controllers/appointmentController')

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
router.use('/auth', authRoutes);

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    // const stories = await Story.find({ user: req.user.id }).lean()
    const stories = await Story.find({}).lean();
    let userInfo = (req.cookies['user']);
    userInfo = userInfo ? JSON.parse(userInfo) : {}
    res.render('dashboard', {
      obj: userInfo,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});
router.get('/graph', ensureAuth, async (req, res) => {
  try {
    res.render('graph');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});
router.post('/save-appointment', ensureAuth, AppointmentController.saveAppointment);
router.get('/book-appointment',ensureAuth, AppointmentController.bookAppointment);

module.exports = router;
