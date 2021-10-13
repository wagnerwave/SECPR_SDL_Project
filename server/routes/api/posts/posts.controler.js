/**
 * 
 */
const postService = require('./posts.service');
const userService = require('../users/users.service');

const config      = require("../../../config/default.json");
const Post        = require("../../../model/Post");
const jwt         = require('jsonwebtoken');

// HTTP STATUS CODE
const HTTP_BAD_REQUEST_CODE  = 400;
//const HTTP_UNAUTHORIZED_CODE = 401;
const HTTP_OK_CODE           = 200;
const HTTP_CREATED_CODE      = 201;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getAllPostsControler(req, res) {
    console.log(req);

    let allPosts = await Post.find();
    console.log("All posts is egal to :", allPosts);
    res.setHeader("Content-Type", "application/json");
    return res.status(HTTP_OK_CODE).json(allPosts);
}

/**
 *                  
 * @param {*} req   
 * @param {*} res   
 * @param {*} next  
 */
async function publishPostControler(req, res, next) {
    let title = req.body.title;
    let content = req.body.content;
    let username = req.body.username;
    
    console.log("title = ", title);
    console.log("content = ", content);
    console.log("username = ", username);

    await postService.addPost(title, content, username)
    .then(response => {
    	return res.status(HTTP_CREATED_CODE).send(response);                        
    })
    .catch(err => {
        console.error("After Add new user function : ", err)
        return res.status(HTTP_BAD_REQUEST_CODE).send(err);                        
    })
    next();
}

module.exports = {
    publishPostControler,
    getAllPostsControler
}