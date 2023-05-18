// import user model
const User = require('../../models/user');
// import bcrypt and jwt
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// declaring postLogin logic
const postLogin = async (req, res) => {
    try {
        // get mail from input
        const { mail, password } = req.body;

        // check if user email is in DB
        const user = await User.findOne({ mail: mail.toLowerCase() });

        // check if pass word and email match DB
        if (user && (await bcrypt.compare(password, user.password))) {
            // send new token
            const token = jwt.sign(
                {
                    userID: user._id,
                    mail,
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '24h'
                }
            );

            // return status and user data
            return res.status(200).json({
                userDetails: {
                    mail: user.mail,
                    token: token,
                    username: user.username,
                }
            })
        }

        // tell user to try again
        return res.status(400).send('Invalid credentials. Please try again.');
    } catch (err) {
        // server error
        return res.status(500).send('Something went wrong. Please try again.');
    }
};

// exporting postLogin
module.exports = postLogin;