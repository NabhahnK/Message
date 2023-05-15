// importing individual controller logic
const postLogin = require('./postLogin');
const postRegister = require('./postRegister');

// exporting all auth logic
exports.controllers = {
    postLogin,
    postRegister,
};