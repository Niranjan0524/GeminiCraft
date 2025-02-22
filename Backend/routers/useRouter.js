const express=require('express');

const userRouter=express.Router();
const { postSignup } = require("../controllers/UserController");
const {preSignup} = require("../controllers/UserController");
const {login} = require("../controllers/UserController");
const {editProfile} = require("../controllers/UserController");
const {getUser} = require("../controllers/UserController");

userRouter.post("/signup", preSignup, postSignup);
userRouter.post("/login",login);
userRouter.get("/getUser",getUser);
userRouter.put("/edit",editProfile);

module.exports=userRouter;
