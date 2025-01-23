const conversation = require('../model/conversation');

const {generateContent} = require('../service/geminiService');
const Conversation = require('../model/conversation');


exports.newConversation=async(req,res)=>{

    const {prompt,model}=req.body;   

    try{      
    
      console.log("Prompt inside controller:", prompt);
      const result = await generateContent(prompt,model);
      console.log("Result inside controller:", result);

      const conversation1=new Conversation ({  
        title:prompt,
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

      console.log("Conversation1:",conversation1);
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
  console.log("ID inside controller:", id);

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