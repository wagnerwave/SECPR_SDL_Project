/**
*** Packages
**/
const {validationResult} = require('express-validator');
let sanitize = required('mongo-sanitize');
let xssFilters = require('xss-filters');

// Include service functions
const userService = require('./users.service');
const User = require('../../../model/Users');

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
    
    /* First we sanitize inputs from $ signs or attemps to make XSS attacks */
    
    let email    = sanitize (xssFilters(req.body.email));
    let username = sanitize (xssFilters(req.body.username));
    let password = sanitize (xssFilters(req.body.password));
  
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

    // Get user form the database
    let user = await User.findOne({"username": username}).select("username").lean();                                     
    if (!user) {
      return res.status(HTTP_BAD_REQUEST_CODE).send('fail');                        
    } else {
      await userService.authentifyUser(user)
      .then(response => {
          // The response is a token
          // Check if the token is null
          if (response == null) {
            return res.status(HTTP_BAD_REQUEST_CODE).send(response);                        
          } else {
            // Send the token
            return res.status(HTTP_OK_CODE).send(response);                        
          }
        })
        .catch(err => {
          console.error(err)
          return res.status(HTTP_BAD_REQUEST_CODE).send("fail");                        
        })
      next();  
    }
}

module.exports = {
    registerControler,
    loginControler
}