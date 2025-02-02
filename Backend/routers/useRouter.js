const express=require('express');

const userRouter=express.Router();
const { postSignup } = require("../controllers/UserController");
const {preSignup} = require("../controllers/UserController");
const {login} = require("../controllers/UserController");
const {editProfile} = require("../controllers/UserController");

userRouter.post("/signup", preSignup, postSignup);
userRouter.post("/login",login);

userRouter.put("/edit",editProfile);

module.exports=userRouter;
