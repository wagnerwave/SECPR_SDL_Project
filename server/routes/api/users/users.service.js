/**
 * Packages
 */
const jwt          = require("jsonwebtoken");
const crypto       = require("crypto");

// Include service functions
const config       = require("../../../config/default.json");
const User         = require("../../../model/Users");

/*
** Name of the function : addNewUser
** Description : Add a new user in the database
** Type : service 
** Return : 
**      -> Success : HTTP code 200 & message User Registered
**      -> Failure : throw an error, HTTP code 500 
*/
async function addNewUser(email, username, password) {
    try {        
        let user = await User.findOne({email: email}).select("email").lean();                                     
        console.log("Return user find .. or not :", user);

        if (user) {
            console.log("User Already Exists");
            return "User Already Exists";
        } else {
            newUser = new User({
                    email,
                    username,
                    role: "user",
                    password
                });
            console.log("New User Created." + "[" + email + "-" + username + "-" + password+ "]");
            await newUser.save(); 
            console.log("User Registered");
            return "User Registered";
        }
    }
    catch(err){
        console.error("Error: " + err.message);
        throw Error("Server Error");
    }
}

/*
** Name of the function : authentifyUser
** Description : anthentify an user
** Type : service 
** Return : 
**      -> Success : HTTP code 200 & message User Registered
**      -> Failure : throw an error, HTTP code 500 
*/
async function generateToken(user) {
    try {
        let payload = {
            "username": user.username,
            "role": "user"
        }
        //console.log("payload is :", payload);
        // Generate Json Web Token
        let token = jwt.sign(payload, config.secret, { expiresIn: '7d' });
        return token;
    } catch(err) {
        console.error("Error: " + err.message);
        // Return null as error
        throw Error(null);
    }
}

/**
 * 
 * @param {*} token
 */
async function authenticateToken(token) {
    try {
        let verifyToken = jwt.verify(token, config.secret, (err) => {
            if (err) return null
        })
        return verifyToken;
    } catch(err) {
        console.error("Error: " + err.message);
        // Return null as error
        throw Error(null);
    }
}

module.exports = {
    addNewUser,
    generateToken,
    authenticateToken
}