const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Appointment = require('../models/appointmentModel');

router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().lean();
    res.render('appointments', { appointments });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

 // edit appointment form
router.get('/appointments/edit/:id', ensureAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).lean();
    res.render('appointments/edit', { appointment });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// update appointment
router.put('/appointments/:id', ensureAuth, async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id).lean();

    if (!appointment) {
      return res.render('error/404');
    }

    appointment = await Appointment.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.redirect('/appointments');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// delete appointment
router.delete('/appointments/:id', ensureAuth, async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id).lean();

    if (!appointment) {
      return res.render('error/404');
    }

    await Appointment.remove({ _id: req.params.id });

    res.redirect('/appointments');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = router;
 