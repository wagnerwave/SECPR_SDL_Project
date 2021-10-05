const express = require('express');
const md5 = require('md5');
const {check , validationResult} = require('express-validator');
const router = express.Router();
const User = require('../../model/Users');

// Add service of status
const statusService = require('./status/status.service');

// Add controler of users
const usersControler = require('./users/users.controler');

// Add Posts
router.post('/register', usersControler.registerControler);
router.post('/login', usersControler.loginControler);


router.post('/logout', async (req,res) => {
    return;
});

/**
 * Method POST & GET to check if the backend works
 */
router.post('/status', statusService.statusService);
router.get('/status', statusService.statusService);

// Delete Post
module.exports = router;