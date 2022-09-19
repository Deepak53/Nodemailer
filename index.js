const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const {signup} = require('./controller/signup');
const signin = require('./controller/signin');
const  {verifytoken} = require('./controller/token');
const {deluser} = require('./controller/signup');
const {patchs} = require('./controller/signup');
const port = 8000;

mongoose.connect("mongodb://localhost:27017/trybus");
app.use(bodyparser.json());
app.post('/signup', signup);
app.post('/signin',verifytoken, signin);
app.delete('/new/delete',deluser);
app.patch('/patch',patchs)


app.listen(port , ()=>{
    console.log(port);
})