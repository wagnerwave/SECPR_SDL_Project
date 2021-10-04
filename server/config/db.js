const mongoose  = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async() => {
    try {
        console.log("Creating Database ...");
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    }
    catch(err) {
        console.log("Error: ...");
        console.error(err.message);
        console.log('MongoDB Disconnected...')
    }
}

module.exports = connectDB;