// import router from express.
const express = require('express');
const router = express.Router();
// importing validation dependencies
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

// importing logic from controllers
const authControllers = require('../controllers/auth/authControllers');

// route to register new user.
router.post('/register', authControllers.controllers.postRegister);

// route for user login.
router.post('/login', authControllers.controllers.postLogin);

module.exports = router;