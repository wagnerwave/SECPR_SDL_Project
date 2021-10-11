/*
** Packages
*/
const jwt = require('jsonwebtoken');

// Include service functions
const config = require('../../../config/default.json');

module.exports = {
    generateJwtToken,
    verifyJSONBWebToken
}

async function generateJwtToken(user) {
    try {
        let payload = {
            "username": user.username,
            "role": "user"
        }
        // Generate Json Web Token
        let token = jwt.sign(payload, config.secret, { expiresIn: '7d' });

        // Return the generate token
        return token;
    } catch(err) {
        console.error("Error: " + err.message);
        // Return null as error
        return null;
    }
}

async function verifyJSONBWebToken(Token) {
    try {
        //console.log("Token is egal to :", Token);
        let tokenData = jwt.verify(Token, config.secret);
        //console.log("Token Data :", tokenData);
        if (tokenData.role == 'user') {
            return tokenData.role;
        } else {
            return tokenData.role;
        }
    }  catch(err) {
        console.error("Error: " + err.message);
        return 'fail';
    }
}