const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique:true
    },
    username:{
        type: String,
        required: true 
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('user', UserSchema);