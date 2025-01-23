const mongoose = require('mongoose');

const conversationSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    model:{type:String,required:true},
    messages:[{
      role:{
          type:String,
          required:true
      },
      content:{
          type:String,
          required:true
      },
    }],
    startTime:{
        type:Date,
        default:Date.now,
        required:true
    }
})

module.exports=mongoose.model('conversation',conversationSchema);