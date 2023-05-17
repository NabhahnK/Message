// import mongoose
const mongoose = require('mongoose');

// create user schema
const userSchema = new mongoose.Schema({
    mail: { type: String, unique: true },
    username: { type: String },
    password: { type: String },
})

// export user schema under the name user
module.exports = mongoose.model("user", userSchema);