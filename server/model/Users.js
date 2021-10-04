const mongoose = require('mongoose');

original_id = ObjectId();

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique:true
    },
    username:{
        "id": original_id,
        type: String,
        required: true 
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('user', UserSchema);