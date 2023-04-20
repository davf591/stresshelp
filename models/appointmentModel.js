const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    appointmentDate: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = mongoose.model('Appointment', schema);
