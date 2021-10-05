/**
 * Packages
 */
const {validationResult} = require('express-validator');

// Include service functions
const userService = require('./users.service');

// HTTP STATUS CODE
const HTTP_BAD_REQUEST_CODE = 400;
const HTTP_OK_CODE          = 200;

/*
** Name of the function : registerControler
** Description : Controle all inputs before to use addNewUser function
** Type : controler 
** Return : 
**      -> Success : HTTP code 200 & message User Registered
**      -> Failure : throw an error, HTTP code 400 
*/
async function registerControler(req, res, next) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {                                                                   
        return res.status(400).send({errors:errors.array()});                        
    }

    let email    = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    if (!email) {
      return res.status(HTTP_BAD_REQUEST_CODE).send({"error": "email field is empty"});                        
    }
    if (!username) {
      return res.status(HTTP_BAD_REQUEST_CODE).send({"error": "username field is empty"});                        
    }
    if (!password) {
      return res.status(HTTP_BAD_REQUEST_CODE).send({"error": "password field is empty"});                        
    }
  
    await userService.addNewUser(email, username, password)
    .then(ok => {
        console.log("After Add new user function : ", ok)
        return res.status(HTTP_OK_CODE).send('User Registered');                        
      })
      .catch(err => {
        console.error("After Add new user function : ", err)
        return res.status(HTTP_BAD_REQUEST_CODE).send('User Already Exists');                        
      })
    next();
}

/*
** Name of the function : loginControler
** Description : Controle all inputs before to check the authentification of user
** Type : controler 
** Return : 
**      -> Success : HTTP code 200 & message User Registered
**      -> Failure : throw an error, HTTP code 400 
*/
async function loginControler(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {                                                                   
        return res.status(400).send({errors:errors.array()});                        
    }

    let username = req.body.username;
    let password = req.body.password;

    if (!username) {
      return res.status(400).json({"error": "username field is empty"});                        
    }
    if (!password) {
      return res.status(400).json({"error": "password field is empty"});                        
    }

    await userService.authentifyUser(username, password)
    .then(ok => {
        console.log(ok)
        return res.status(HTTP_OK_CODE).send("ok");                        
      })
      .catch(err => {
        console.error(err)
        return res.status(HTTP_BAD_REQUEST_CODE).send("fail");                        
      })
    next();
}

module.exports = {
    registerControler,
    loginControler
}