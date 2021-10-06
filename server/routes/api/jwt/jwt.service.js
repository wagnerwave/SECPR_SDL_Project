/*
** Packages
*/
const jwt = require('jsonwebtoken');

// Include service functions
const config = require('../../../config/default.json');

module.exports = {
    generateJwtToken,
    verifyJSONBWebToken,
}

async function generateJwtToken(user) {
    try {
        let payload = {
            "username": user.username,
            "role": user.role
        }
        //console.log("payload is :", payload);
        // Generate Json Web Token
        let token = jwt.sign(payload, config.secret, { expiresIn: '7d' });
        
        //console.log("generate token is :", token);
        // Return the generate token
        return token;
    } catch(err) {

        console.error("Error: " + err.message);
        // Return null as error
        return null;
    }
}

async function verifyJSONBWebToken(Token) 
{
    console.log("The token to verify is : ", Token);
    try {
        var i = jwt.verify(Token, config.secret)
        console.log("Return of verify :", i);
        return 'ok';
    }  catch(err) {
        console.error("Error: " + err.message);
        return 'fail';
    }
}