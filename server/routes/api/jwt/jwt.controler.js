/**
 * Packages
 */
const {validationResult} = require('express-validator');

// Include service functions
const jwtService = require('./jwt.service');
const User = require('../../../model/Users');

// HTTP STATUS CODE
const HTTP_BAD_REQUEST_CODE = 400;
const HTTP_FORBIDDEN_CODE   = 403;
const HTTP_OK_CODE          = 200;

/**
 * Create a Json Web Token  
 * @param {* req (request) use to get data send by front-end } req 
 * @param {* res (response) use to send data } res 
 * @param {* close the function } next 
 * @returns res
 */
async function createJWTControler(req, res, next) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {                                                                   
        return res.status(400).send({errors:errors.array()});                        
    }

    // initialise username by the resquest data username
    let username = req.data.username;

    // Get user form the database
    let user = await User.findOne({"username": username}).select("username").lean();                                     
    if (!user) {
      return res.status(HTTP_BAD_REQUEST_CODE).send('fail');                        
    } else {
      //console.log("Username is egal to :", user.username);
      // Generate the Json Web Token 
      await jwtService.generateJwtToken(user)
      .then(token => {
          //console.log("Token generated : ", token)
          return res.status(HTTP_OK_CODE).send(token);                        
        })
        .catch(err => {
          console.error("Error in function generateJwtToken : ", err)
          return res.status(HTTP_BAD_REQUEST_CODE).send('fail');                        
        });
      next();
      }
  }

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function verifyJWTControler(req, res, next)   {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {                                                   
      return res.status(400).send('fail');                    
  }

  let token = req.body.token;
  //console.log("Token get by the requ  est is : ", req.body);
  await jwtService.verifyJSONBWebToken(token)
  .then(response => {
    //console.log(response);
    if (response != 'fail') {
      return res.status(HTTP_OK_CODE).json({"jwt": response});
    } else {
      return res.status(HTTP_FORBIDDEN_CODE).send('fail');                        
    }
  })
  .catch(err => {
    //console.log("After Add new user function : ", err)

    return res.status(HTTP_FORBIDDEN_CODE).send('fail');                        
  })
  next();
}

module.exports = {
    createJWTControler,
    verifyJWTControler
}