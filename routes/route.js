const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const expressValidator = require("express-validator");
const validator = require("../validators");

const router = express.Router();
router.use(bodyParser());
router.use(cookieParser())
router.use(expressValidator());

//getting all the result from database
router.get("/posts", function(req, res) {
  const posts = Post.find()
    .select("_id title body") // only these field display
    .then(posts =>
      res.json({
        posts: posts
      })
    )
    .catch(error => console.log(error));
});

router.post("/post", validator.createPostValidator, function(req, res) {
  const post = new Post(req.body);
  // console.log(req.body)
  //saving to db
  post.save((error, result) => {
    res.json({
      post: result
    });
  });
});

//signup
router.post("/signup",validator.userSignupValidator, async function(req, res) {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
        return res.status(403).json({
            error: "Email is taken!"
        });
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message: "Signup success! Please login." });
});

//signin
router.post('/signin',function(req,res){

    //find user based on email and password


    //if error and no user


    //if user exits then authenticate


    //generate a token with userid and secret key which is in .env


    //store the token as cookie with expiry time


    //return response token to the cilent 
})
module.exports = router;
