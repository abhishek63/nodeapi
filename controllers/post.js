const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash")

exports.postById=(req,res,next ,id)=>{
    Post.findById(id)
        .populate("postedBy","_id name")
        .exec((err,post)=>{
            if(err || !post)
                return res.status(403).json({error : err})
            
            req.post = post
            console.log("hello owoo",req.post)
            next()
        })
}

exports.getPosts = (req, res) => {
    const posts = Post.find()
        .populate("postedBy","_id name")
        .select("_id title body")
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => console.log(err));
};

exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let post = new Post(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.postsByUser= (req,res)=>{
    Post.find({postedBy : req.profile._id})
    .populate("postedBy", "_id name")
    .sort("_created")
    .exec((error, posts)=>{
        if(error)
            return res.status(400).json({error : error})
        
        return res.json({posts})

    })
}

exports.isPoster = (req, res, next) => {
    const isPoster =
        req.post && req.auth && req.post.postedBy._id == req.auth._id;

    if (!isPoster) {
        return res.status(403).json({
            error: "User is not authorized to perform this deletion"
        });
    }

    console.log("isposter",isPoster)

    next();
};


exports.deletePost = (req,res)=>{
    let post = req.post
    post.remove((err,post)=>{
        if(err){
            return res.status(403).json({
                error :err
            })
        }

        res.json({
            message : "post is successfully deleted"
        })
    })
}

exports.updatePost = (req, res, next) => {
    let post = req.post;
    post = _.extend(post, req.body); // extend - mutate the source object
    post.updated = Date.now();
    post.save(err => {
        if (err) {
            return res.status(400).json({
                error: "You are not authorized to perform this action"
            });
        }

        res.json({ post });
    });
};

