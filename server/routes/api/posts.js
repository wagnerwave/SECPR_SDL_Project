const express = require('express');
const md5 = require('md5');
const {check , validationResult} = require('express-validator');
const router = express.Router();

// Add service of status
const statusService = require('./status/status.service');

// Add controler of users
const usersControler = require('./users/users.controler');

// Add controler of jwt
const jwtControler = require('./jwt/jwt.controler')

/**
 * Manage users
 */
router.post('/register', usersControler.registerControler);
router.post('/login', usersControler.loginControler);

// Not defined yet
router.post('/logout', async (req,res) => {
    return;
});

/**
 * Request for check if the backend works
 */
router.get('/status', statusService.status);

/**
 * Manage Json Web Token
 */
router.post('/check-admin-access', jwtControler.verifyAdminJWTControler);

// Delete Post
module.exports = router;