const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { firstName: String, lastName: String },
    email: String,
    phone: String,
    dob: Date,
    address: { city: String, state: String, pincode: Number },
    gender: String,
    designation: String,
    interests: [String]
});


const User = mongoose.model('User', userSchema);

const joiSchema = Joi.object({
    name: Joi.object({
        firstName: Joi.string().max(20).required(),
        lastName: Joi.string().min(2).max(20).required(),
    }),
    email: Joi.string().min(5).regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),
    phone: Joi.string().regex(/^\d{8,10}$/).required(),
    dob: Joi.date().max('now').required(),
    address: Joi.object({
        city: Joi.string().required(),
        state: Joi.string().required(),
        pincode: Joi.string().regex(/^\d{6}$/).required()
    }).required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    designation: Joi.string().max(30),
    interests: Joi.array().items(Joi.string().max(20)).required(),
});

exports.User = User;
exports.joiSchema = joiSchema;
