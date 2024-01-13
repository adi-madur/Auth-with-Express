const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;

const connectToDatabase = async () => {
    mongoose.connect(MONGODB_URL)
    .then((conn)=>{
        console.log(`Connected to Database: ${conn.connection.host}`);
    })
    .catch((error)=>{
        console.log(error.message);
    })
}

module.exports = connectToDatabase;