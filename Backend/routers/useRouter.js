const express=require('express');

const userRouter=express.Router();
const { postSignup } = require("../controllers/UserController");
const {preSignup} = require("../controllers/UserController");

userRouter.post("/signup", preSignup, postSignup);


module.exports=userRouter;
