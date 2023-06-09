// import router from express.
const express = require('express');
const router = express.Router();
// importing logic from controllers
const authControllers = require('../controllers/auth/authControllers');
// importing validation dependencies
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
// import middleware
const auth = require('../middleware/auth');

// create validation schema
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    password: Joi.string().min(6).max(12).required(),
    mail: Joi.string().min(6).required().email().required(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).max(12).required(),
    mail: Joi.string().min(6).required().email(),
});

// route to register new user.
router.post(
    '/register',
    validator.body(registerSchema),
    authControllers.controllers.postRegister
);

// route for user login.
router.post('/login',
    validator.body(loginSchema),
    authControllers.controllers.postLogin
);

// test route to test auth.js middleware
router.get('/test', auth, (req, res) => {
    res.send("request passed");
});

module.exports = router;