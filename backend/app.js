//module/packages
require('dotenv').config
const express = require('express')
const app = express();
const router1 = require('./routes/main.js');

//middleware
app.use(express.json())

//route
app.use('/admin', router1);


//server
app.listen(3000,()=>{
    console.log('server is running');
})
