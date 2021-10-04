const mongoose = require('mongoose');

const ScoreboardSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    scoreboard:{
        type: Number,
        required: true 
    }
    
});

module.exports = User = mongoose.model('scoreboard', ScoreboardSchema);