exports.createPostValidator = (req,res,next)=>{

    //title
    req.check('title','Title is required').notEmpty();
    req.check('title',"title must be between 4 and 150 characters").isLength({
        min : 4,
        max : 150
    })

    //checks for error
    const errors = req.validationErrors();

    //extrat only first error message
    if(errors){
        const firstError = errors.map(
            (error)=> error.msg)[0];
             
            return res.status(400).json({
                error : firstError
            })
    }

    

    next()

}