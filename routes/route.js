const express = require('express');

const router = express.Router();

router.get("/posts",function(req,res){
    res.json({
        title : "this is first post",
        body : "this is body content"
    })
})


module.exports = router;