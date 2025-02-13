const User = require("../model/user");
const bcrypt = require("bcryptjs");
const expressValidator = require("express-validator");
const jwt=require("jsonwebtoken");

const nameValidator = expressValidator
  .check("name")
  .notEmpty()
  .withMessage("Name is required")
  .trim()
  .isLength({ min: 2 })
  .withMessage("Name should be atleast 2 characters Long")
  .matches(/^[A-Za-z\s]+$/)
  .withMessage("Name must contain only alphabets");

const emailValidator = expressValidator
  .check("email")
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("please enter valid Email")
  .normalizeEmail();

const passwordValidator = expressValidator
  .check("password")
  .notEmpty()
  .withMessage("Password is required")
  .isLength({ min: 6 })
  .withMessage("Password should be at least 6 characters long")
  .matches(/\d/)
  .withMessage("Password should contain at least one number");

const confirmPasswordValidator = expressValidator
  .check("confirmPassword")
  .notEmpty()
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  });

exports.preSignup = [
  nameValidator,
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
  (req, res, next) => {
    const errors = expressValidator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array().map((error) => error.msg),
        isLoggedIn: false,
        oldInput: {
          name: req.body.name,
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
        },
      });
    }
    next();
  },
];

exports.postSignup =  (req, res) => {
  const { name, userName, email, password } = req.body;

  console.log(name, userName, email, password);
  bcrypt.hash(password, 12).then((hashedPassword) => {
    const user = new User({
      name: name,
      userName: userName,
      email: email,
      password: hashedPassword
    });

    user
      .save()
      .then((result) => {
        console.log("User Created Successfully");
        return res.status(201).json({
            message:"User Logged in successfully"
        })
      })
      .catch((error) => {
        return res.status(500).json({
            message:"User not created",
        })
      });
  }); 
};


exports.login=async(req,res)=>{


  const {email,password}=req.body;
  console.log(req.body);

  const user=await User.findOne({
    email
  }); 

  if(!user){
    return res.status(404).json({
      message:"user not found"
    })
  }

  const isEqual=await bcrypt.compare(password,user.password);

  if(!isEqual){
    return res.status(401).json({
      message:"Invalid password or email"
    })
  }

  const token=jwt.sign({
    email:user.email,
    userId:user._id.toString()
  },
    process.env.JWT_SECRET,
    {
      expiresIn:"7d"
    }
  )

  res.json({
    message:"User Logged in successfully",
    user:{
      name:user.name,
      email:user.email,
      userName:user.userName,
      conversation:user.conversations
    },
    token
  })

}


exports.editProfile=async(req,res)=>{
  const {name,email}=req.body;

  console.log(name,email);

  res.json({success:true,
    message:"Profile Updated"
  })
}