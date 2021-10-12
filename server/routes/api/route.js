const express = require('express');
const md5 = require('md5');
const {check , validationResult} = require('express-validator');
const router = express.Router();

// Add service of status
const statusService = require('./status/status.service');
// Add controler of users
const usersControler = require('./users/users.controler');
// Add controler of jwt
const jwtControler = require('./jwt/jwt.controler');
// Add controler of posts
const postControler = require('./posts/posts.controler');

/**
 * Add new user
 */
router.post('/register', usersControler.registerControler);

/**
 * Check if the user exist and if yes return a JWT
 */
router.post('/login', usersControler.loginControler);

/**
 * Request for check if the backend works
 */
router.get('/status', statusService.status);

/**
 * Check if the token is valid and return the role of the user if the token is valid
 */
router.post('/check-access', jwtControler.verifyJWTControler);

/**
 * Check if user have access to read all the posts
 */
router.get('/posts/get-all', postControler.getAllPostsControler);

/**
 * Add a post to the database
 */
router.post('/posts/publish', postControler.publishPostControler);

module.exports = router;