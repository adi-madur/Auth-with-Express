const express = require('express');
const app = express();
const authRoute = require('./routes/authRoute.js');
const connectToDatabase = require('./config/databaseConfig.js');
const cookieParser = require('cookie-parser');

connectToDatabase();

app.use(express.json()); //--> To accept json as data
app.use(cookieParser()); // --> It is used so that, the cookie will be parsed in json format for further processing

app.use('/api/auth/', authRoute);


app.use('/', (req, res)=>{
    res.status(200).json({
        data : "JW Auth Server",
    })
})

module.exports = app;