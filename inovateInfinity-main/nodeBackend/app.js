const express = require('express');
const app = express();
const mongooe = require('mongoose');

const mongoURI='mongodb://localhost:27017/loginData';
const authRouter= require('./routes/auth');


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
mongooe.connect(mongoURI)
mongooe.connection.on('open',()=>{
    console.log("database connection established");
});

app.listen(3000,(err)=>{
    if(!err){
        console.log("app is listening");
    }}

)