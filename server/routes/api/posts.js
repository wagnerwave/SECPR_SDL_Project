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
// Get Posts
router.get("/github-sign-in", async(req, res) => {
    const clientID = "cc06a2093a0c8600eef6";
    const clientSecret = "9cf78b4780d589bc306966bd20b8557d13a3d4c4";

    const requestToken = req.query.token;
    console.log(requestToken);
    const GitRes = await axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        headers: {
             accept: 'application/json'
        }    
    })
    const access_token = GitRes.data.access_token;
    console.log(access_token);
    return res.send(access_token);
});

router.get("/twitch-sign-in", async(req, res) => {
    const client_id = "f6sq52jw9i9242rxfereg353dxbed0";
    const redirect_uri = "http://localhost:8080/loading_twitch";
    const client_secret = "rrm79c53qq96jztgn2td1plqsmcgz3";
    const requestToken = req.query.token;

    console.log(requestToken);
    const TwitchRes = await axios({
        method: 'post',
        url: `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&code=${requestToken}&grant_type=authorization_code&redirect_uri=${redirect_uri}`,
        headers: {
             accept: 'application/json'
        }    
    })
    const access_token = TwitchRes.data.access_token;
    console.log(access_token);
    return res.send(access_token);
});

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
    let GoogleTokenId = "null";
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
                GoogleTokenId
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

router.post('/google-sign-in', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    
    let GoogleTokenId = req.body.token;
    
    console.log("Token Google: ")
    console.log(GoogleTokenId);    
    return res.send(GoogleTokenId);
});

// Delete Post
module.exports = router;