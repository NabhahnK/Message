// import user model
const User = require('../../models/user');
// import bcrypt and jwt
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// declaring postLogin logic
const postLogin = async (req, res) => {
    res.send('login route');
};

// exporting postLogin
module.exports = postLogin;