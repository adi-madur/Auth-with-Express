const express = require('express');
const app = express();
const authRoute = require('./routes/authRoute.js');
const connectToDatabase = require('./config/databaseConfig.js');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // --> Importing CORS for conversing Front End and Back End

connectToDatabase();

app.use(express.json()); //--> To accept json as data
app.use(cookieParser()); // --> It is used so that, the cookie will be parsed in json format for further processing

// CORS Configurations
app.use(cors({
    origin: [process.env.CLIENT_URL], // --> Allows access to the mentioned URL in .env file
    credentials: true // --> Allows Cookies to set by the website mentioned..

}))

app.use('/api/auth/', authRoute);


app.use('/', (req, res)=>{
    res.status(200).json({
        data : "JW Auth Server",
    })
})

module.exports = app;

// ENV file should include:
/* 
PORT
MONGODB_URL
SECRET
CLIENT_URL
*/