const conversation = require('../model/conversation');

const {generateContent} = require('../service/geminiService');
const Conversation = require('../model/conversation');

const {generateTitle} = require('../service/geminiService');

exports.newConversation=async(req,res)=>{

    const {prompt,model}=req.body;    
    

    try{
      const finaltitle=await generateTitle(prompt,model);

      const result = await generateContent(prompt,model);
      

      const conversation1=new Conversation ({  
        title:finaltitle,
        model:model,
        messages:[{
          role:"user",
          content:prompt
        },
        {
          role:"assistant",
          content:result.response
        }]
      });
      await conversation1.save();

      res.json({conversation1})
      
    }
    catch(err){
      console.log(err);
      res.status(500).json({message:err}); 
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
  res.json({conversations});
  next();
}



exports.getConversation=async(req,res)=>{
  const conversations=await conversation.find();

  if(!conversations){
      return res.status(404).json({message:"Conversation not found"});
  }
  res.json({conversations});
};


exports.deleteConversation=async(req,res)=>{
  const id=req.params.id;
  
  await conversation.findByIdAndDelete(id);
  res.status(204).json({message:"Conversation deleted successfully"});  
}