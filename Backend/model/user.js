const mongoose=require('mongoose');

const summarySchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true
  },
  data: {
    type: String,
    required: true
  }
});

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    userName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePic:{type:String ,default:"none"},
    conversations:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation"
    }],
    summaries:[summarySchema]
})


const User=mongoose.model("User",userSchema);

module.exports=User;