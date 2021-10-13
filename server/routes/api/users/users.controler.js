/**
*** Packages
**/
const {validationResult} = require('express-validator');
let sanitize = require('mongo-sanitize');
let xssFilters = require('xss-filters');

// Include service functions
const userService = require('./users.service');
const User = require('../../../model/Users');

// HTTP STATUS CODE
const HTTP_BAD_REQUEST_CODE  = 400;
const HTTP_UNAUTHORIZED_CODE = 401;
const HTTP_OK_CODE           = 200;
const HTTP_CREATED_CODE      = 201;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function registerControler(req, res, next) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {                                                                   
        return res.status(400).send({errors:errors.array()});                        
    }

    /* First we sanitize inputs from $ signs or attemps to make XSS attacks */
    // need to check how the function works before
    // let email    = sanitize(xssFilters(req.body.email));
    // let username = sanitize(xssFilters(req.body.username));
    // let password = sanitize(xssFilters(req.body.password));
    let email = req.body.email;
    let username = req.body.username;
    let password  = req.body.password;

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
    	return res.status(HTTP_CREATED_CODE).send(ok);                        
    })
    .catch(err => {
        console.error("After Add new user function : ", err)
        return res.status(HTTP_BAD_REQUEST_CODE).send(err);                        
    })
    next();
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function loginControler(req, res, next) {
	const errors = validationResult(req);

  	if (!errors.isEmpty()) {                                                                   
  	    return res.status(400).send({errors:errors.array()});                        
  	}
  
  	let username = req.body.username;
  	let password = req.body.password;

    if (!username) {
      return res.status(HTTP_BAD_REQUEST_CODE).json({"error": "username field is empty"});                        
    }
    if (!password) {
      return res.status(HTTP_BAD_REQUEST_CODE).json({"error": "password field is empty"});                        
    }

    // Get user form the database
    let user = await User.findOne({"username": username}).select("username").lean();                                     
    if (!user) {
      return res.status(HTTP_BAD_REQUEST_CODE).send('fail');                        
    } 
 
    await userService.generateToken(user)
    .then(response => {
        // The response is a token
        // Check if the token is null
        console.log("Auth User return : " + response);
        if (response == null) {
          return res.status(HTTP_BAD_REQUEST_CODE).send("fail");                        
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

async function tokenControler(req, res, next) {
	  //const authHeader = req.headers['authorization'];
  	//// Get the token present in the headers authorization
  	//const token = authHeader & authHeader.split(' ')[1]; 
    //
  	//if (token == null) {
    //	return res.status(HTTP_UNAUTHORIZED_CODE);
  	//}

  	await userService.authenticateToken(token)
  	.then(response => {
      console.log("Response :", response);
  	  if (response == null) {
  	    return res.status(HTTP_BAD_REQUEST_CODE).send("fail");                        
  	  } else {
  	    // Send the token
  	    return res.status(HTTP_OK_CODE).send(response);                        
  	  }
  	})
  	.catch(err => {
  	  console.error(err.message)
  	  return res.status(HTTP_BAD_REQUEST_CODE).send("fail");                        
  	})
  	next();  
}

module.exports = {
    registerControler,
    loginControler,
    tokenControler
}