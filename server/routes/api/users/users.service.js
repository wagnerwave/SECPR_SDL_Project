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

       /* var sanitize = required('mongo-sanitize');
        var username = sanitize(username);
        var email    = sanitize(email);
        var password = sanitize(password);   */

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
async function authentifyUser(username, password) {
    try {
        let user = await User.findOne({'username': username, "password": password});                                     
        console.log(user);

        if (user) {
            console.log("OK user connected...")
            return "ok";
        } else {
            console.log("fail");
            return "fail";
        }
    }
    catch(err){
        console.error("Error: " + err.message);
        throw Error('Server Error');
    }
}

module.exports = {
    addNewUser,
    authentifyUser
}