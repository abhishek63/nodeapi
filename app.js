const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const router = require('./routes/route');

//configure dotenv
dotenv.config();


//database connection

mongoose.connect(process.env.MONGO_URI).then(
    () => {console.log('Database is connected') 
});

// //if error occur in the database then it will give error
 mongoose.connection.on("error",(err)=> console.log(err));


const app = express();

//middleware used
app.use(morgan('dev'))
app.use('/api',router)


//routes
app.get('/',function(req,res){
    res.send("Hello world")
})

const PORT = process.env.PORT || 8080

app.listen(PORT,function(){
    console.log(`server is running on port ${PORT}` );
})