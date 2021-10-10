const mongoose = require('mongoose');

var original_id = require('mongodb').ObjectID;

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        "id": original_id,
        type: String,
        required: true,
        unique: true 
    },
    role:{
        type: String,
        default: "user",
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('user', UserSchema);