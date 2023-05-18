// import user model
const User = require('../../models/user');
// import bcrypt and jwt
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// declaring postRegister logic
const postRegister = async (req, res) => {
    try {
        // get user entered info from req.body
        const { username, mail, password } = req.body;

        // check if user exists
        const userExists = await User.exists({ mail: mail.toLowerCase() });

        if (userExists) {
            return res.status(409).send('E-mail already in use.');
        }

        // encrypt password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // create user and save in DB
        const user = await User.create({
            username,
            mail: mail.toLowerCase(),
            password: encryptedPassword,
        });

        // create jwt token
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

        // if created, return 201 and user details with token
        res.status(201).json({
            userDetails: {
                mail: user.mail,
                token: token,
                username: user.username,
            }
        })

    } catch (err) {
        // if error return 500 and ask user to try again
        return res.status(500).send("Error occurred. Please try again.");
    }
};

// exporting postRegister
module.exports = postRegister;