exports.createPostValidator = (req, res, next) => {
  //title
  req.check("title", "Title is required").notEmpty();
  req.check("title", "title must be between 4 and 150 characters").isLength({
    min: 4,
    max: 150
  });

  ////body
  req.check("body", "Body is required").notEmpty();
  req.check("body", "Body must be between 4 and 1550 characters").isLength({
    min: 4,
    max: 1550
  });

  //checks for error
  const errors = req.validationErrors();

  //extrat only first error message
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];

    return res.status(400).json({
      error: firstError
    });
  }

  next();
};

exports.userSignupValidator = (req, res, next) => {
  // name is not null and between 4-10 characters
  req.check("name", "Name is required").notEmpty();
  // email is not null, valid and normalized
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32
    });
  // check for password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
