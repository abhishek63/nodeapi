const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

//configure dotenv
dotenv.config();


const app = express();

//middleware used
app.use(morgan('dev'))


//routes
app.get('/',function(req,res){
    res.send("Hello world")
})

const PORT = process.env.PORT || 8080

app.listen(PORT,function(){
    console.log(`server is running on port ${PORT}` );
})