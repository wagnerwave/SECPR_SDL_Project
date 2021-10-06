/**
 * Packages
 */
 const jwt = require('jsonwebtoken');

 // Include service functions
 const config = require('../../../config/default.json');
 
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
        console.log(user);

        if (user) {
            console.log("User Already Exists");
            return "User Already Exists";
        } else {
            newUser = new User({
                    email,
                    username,
                    password
                });
            console.log("New User Created." + "[" + email + "-" + username + "-" + password+ "]");
            await newUser.save(); 
            console.log('User Registered');
            return "User Registered";
        }
    }
    catch(err){
        console.error("Error: " + err.message);
        throw Error('Server Error');
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
async function authentifyUser(user) {
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

module.exports = {
    addNewUser,
    authentifyUser
}