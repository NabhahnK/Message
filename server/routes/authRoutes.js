// import router from express.
const express = require('express');
const router = express.Router();

// route to resgister new user.
router.post('/register', (req, res) => {
    res.send('register route');
});

// route for user login.
router.post('/login', (req, res) => {
    res.send('login route');
});