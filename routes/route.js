const express = require('express');
const Post = require('../models/Post');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const validator = require('../validators');

const router = express.Router();
router.use(bodyParser())
router.use(expressValidator())

//getting all the result from database
router.get("/posts",function(req,res){
    const posts = Post.find()
    .then(posts=>res.json({
        posts : posts
    }))
    .catch(error => console.log(error))
})


router.post('/post',validator.createPostValidator,function(req,res){
    const post = new Post(req.body);
   // console.log(req.body)
   //saving to db
   post.save((error, result)=>{
    
        res.json({
            "post" : result
        })
   })
})

module.exports = router;