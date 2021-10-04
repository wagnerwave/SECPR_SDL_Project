const express = require('express');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const assert = require('assert');
const {check , validationResult} = require('express-validator');
const router = express.Router();
const User = require('../../model/Users');
const Cookies = require('universal-cookie');
const axios = require('axios');
const fetch = require

// Add Posts
router.post('/register', [
    check('email', 'Email is required.').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
],
async (req,res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {                                                                   
        return res.status(400).json({errors:errors.array()});                        
    }

    let email = req.body.email;
    let username = req.body.username;
    let password = md5(req.body.password);
    try {
        let user = await User.findOne({email: email}).select("email").lean();                                     
        console.log(user);
        if (user) {
            console.log("User Already Exists");
            return res.send('User Already Exists');
        }
        user = new User({
                email,
                username,
                password,
            });
            console.log("New User Created." + "[" + email + "-" + username + "-" + password+ "]");
            user = await user.save(); 
            console.log('User Registered');
            return res.send('User Registered');
    }
    catch(err){
        console.error("Error: " + err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/login', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
],
async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {                                                                   
        return res.status(400).json({errors:errors.array()});                        
    }

    let username = req.body.username;
    let password = md5(req.body.password);

    try {
        let user = await User.findOne({username: username, password: password});                                     
        console.log(user);

        if (user) {
            console.log("OK user connected...")
            return res.send('ok');
        } else {
            console.log("fail");
            return res.send('fail');
        }
    }
    catch(err){
        console.error("Error: " + err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/logout', async (req,res) => {
    return;
});


// Delete Post
module.exports = router;