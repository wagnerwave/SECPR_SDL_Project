const mongoose = require('mongoose');

var original_id = require('mongodb').ObjectID;

const PostSchema = new mongoose.Schema({
    username:{
        "id": original_id,
        type: String,
        required: true,
    },
    Title:{
        type: String,
        required: true
    },
    Content:{
        type: String,
        required: true 
    },
    created:{
        type: Number,
        default: Date.now,
        required: true
    }
});

module.exports = User = mongoose.model('Post', PostSchema);