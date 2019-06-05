const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const validator = require("../validators");

const router = express.Router();
router.use(bodyParser());
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
module.exports = router;
