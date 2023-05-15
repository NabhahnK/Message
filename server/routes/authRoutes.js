// import router from express.
const express = require('express');
const router = express.Router();
// importing logic from controllers
const authControllers = require('../controllers/auth/authControllers');
// importing validation dependencies
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

// create validation schema
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12),
    password: Joi.string().min(6).max(12),
    main: Joi.string.email(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).max(12),
    main: Joi.string.email(),
});

// route to register new user.
router.post('/register', authControllers.controllers.postRegister);

// route for user login.
router.post('/login', authControllers.controllers.postLogin);

module.exports = router;