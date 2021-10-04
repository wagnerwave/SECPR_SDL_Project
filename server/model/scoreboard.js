const mongoose = require('mongoose');

var original_id = require('mongodb').ObjectID;

const ScoreboardSchema = new mongoose.Schema({
    username:{
        "id": original_id,
        type: String,
        required: true,
        unique:true
    },
    scoreboard:{
        "id": original_id,
        type: Number,
        required: true 
    }
    
});

module.exports = User = mongoose.model('scoreboard', ScoreboardSchema);