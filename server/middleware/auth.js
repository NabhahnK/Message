// import jwt and .env
const jwt = require('jsonwebtoken');
const config = process.env;

// verify token and logout if wrong or not there
const verifyToken = (req, res, next) => {
    // check if token is anywhere
    let token = req.body.token || req.query.token || req.headers['authorization'];

    // if no token, tell user to login
    if (!token) {
        return res.status(403).send('A token is required for authorization.');
    }

    try {
        // get rif of unneeded text
        token = token.replace(/^Bearer\s+/, "");
        // verify token
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        // save decoded token
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
}