const conversation = require('../model/conversation');
const jwt = require('jsonwebtoken');

const {generateContent} = require('../service/geminiService');
const Conversation = require('../model/conversation');
const User =require('../model/user');
const {generateTitle} = require('../service/geminiService');
const {generateSummary} = require('../service/geminiService');


exports.newConversation=async(req,res)=>{

    const {prompt,model,token}=req.body;  

    if(!token){
      return res.status(401).json({message:"Unauthorized :No token provided"});
    }

    const {email,userId}=jwt.verify(token,process.env.JWT_SECRET);

    try {
      console.log("inside try");
      const finaltitle = await generateTitle(prompt, model);
      console.log("Final Title:",finaltitle);
      const result = await generateContent(prompt, model);


      console.log("Result:",result);
      const conversation1 = new Conversation({
        title: finaltitle,
        model: model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
          {
            role: "assistant",
            content: result.response,
          },
        ],
      });
      await conversation1.save();

      const conv_id=conversation1._id;
      const user=await User.findById(userId);

      if(user){
        user.conversations.push(conv_id);
        await user.save();
      }
      else{
        return res.status(404).json({message:"user not found"});
      }
      console.log("Conversation:",conversation1);
      res.json({ conversation1 });
    } catch (error) {
      console.log("Error inside catch of controller:",error);
      if (error.status === 503) {
        return res
          .status(503)
          .json({
            message: "The model is overloaded. Please try again later.",
          });
      } else {
        return res
          .status(500)
          .json({ message: "An error occurred while generating content." });
      }
    }
    
};


exports.newMessage=async(req,res,next)=>{
  const id=req.params.id;
  const {prompt}=req.body;
 
  const conversations=await conversation.findById(id);

  if(!conversations){
      return res.status(404).json({message:"Conversation not found"});
  } 
  
  const content=await generateContent(prompt,conversations.model,conversations.messages);
  
  
  conversations.messages.push({
    role:"user",
    content:prompt
  },{
    role:"assistant",
    content:content.response
  })

  await conversations.save();
  res.json({conversations, content}); 
}



exports.getConversation=async(req,res)=>{
 
 const authHeader = req.headers.authorization;
 if (!authHeader) {
   return res.status(401).json({ message: "Unauthorized: No token provided" });
 }

 console.log("AuthHeader:",authHeader);
 const token = authHeader.split(" ")[1];
 console.log("Token:",token ,!token);
 if(token==null || !token) {
   return res.status(401).json({ message: "Unauthorized: No token provided" });
 }

  const {userId}=jwt.verify(token,process.env.JWT_SECRET);

  try{
    const user=await User.findById(userId);
    if(!user){
      return res.status(404).json({message:"user not found"});
    }
    const conversations_array=user.conversations;
    
    //array of objects:
    const finalConversations = await Promise.all(
      conversations_array.map((id) => conversation.findById(id))
    );
    
    res.json({ conversations: finalConversations });
  }
  catch(err){
    console.log(err);
    return res.status(404).json({message:err.message});
  }


};


exports.deleteConversation=async(req,res)=>{
  const id=req.params.id;
  console.log("Id:",id);
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const {userId}=jwt.verify(token,process.env.JWT_SECRET);
  const user=await User.findById(userId);

  if(!user){  
    return res.status(404).json({message:"user Not found"});
  }
  await conversation.findByIdAndDelete(id);
  user.conversations=user.conversations.filter((convId)=>id!=convId);

  await user.save();
  
  res.status(204).json({message:"Conversation deleted successfully"});  
}


exports.summarizeConversation=async(req,res)=>{

  console.log("Inside Summarize Conversation");
  const id=req.params.id;
  console.log("Id:",id);


  const authHeader=req.headers.authorization;

  if(authHeader==null){
    return res.status(401).json({message:"Unauthorized:No token Provided"});
  }

  const token=authHeader.split(" ")[1];

  if(token==null){
    return res.status(401).json({message:"Unauthorized:No token"});
  }


  const {userId}=jwt.verify(token,process.env.JWT_SECRET);

  const user= await User.findById(userId);

  if(!user){
    return res.status(404).json({message:"User not found"});
  }
   console.log("userId", userId);

   const chat = user.conversations.filter((ids) => ids == id);

   if(!chat){
    return res.status(404).json({message:"Chat not found"});
   }

    const conversation= await Conversation.findById(id);
    console.log("Conversation:",conversation);
//call gemini service:

   const summary=await generateSummary(conversation);
    console.log("Summary:",summary);

  return res.json({message:"summarized contend",summary:summary});
}