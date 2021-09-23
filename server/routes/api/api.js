// Import Module
const express = require('express');
const mongodb = require('mongodb');
const assert = require('assert');

// Import from Files
const User = require('../../model/Users'); // Schema of users

const statusService = require('./status/status.service'); // Test if api works
// const userController = require('./users/user.controller'); // MiddleWare for users

// Global Variable
const router = express.Router();

/*
* Route API GET
*/
router.get('/api/v1/status', statusService.status);

/*
* Route API POST
*/
router.post('/api/v1/status', statusService.status);

/*
* Route API PUT
*/

/*
* Route API DELETE
*/