const express = require('express');
const Post = require('../models/Post');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser())

router.get("/posts",function(req,res){
    res.json({
        title : "this is first post",
        body : "this is body content"
    })
})


router.post('/post',function(req,res){
    const post = new Post(req.body);
   // console.log(req.body)
   //saving to db
   post.save((error,result)=>{
       if(error)
        res.status(400).json({
            "error" : error
        })

        res.status(200).json({
            "post" : result
        })
   })
})

module.exports = router;