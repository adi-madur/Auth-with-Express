const express = require('express');
const app = express();
const authRoute = require('./routes/authRoute.js');

app.use(express.json()); //--> To accept json as data
app.use('/api/auth/', authRoute);

app.use('/', (req, res)=>{
    res.status(200).json({
        data : "JW Auth Server",
    })
})

module.exports = app;