const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    userName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePic:{type:String ,default:"none"},
    conversations:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation"
    }]
})


const User=mongoose.model("User",userSchema);

module.exports=User;