require('dotenv').config();
const app = require('./app.js');
PORT = process.env.PORT || 5001;
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})