const {generateContent} = require('../service/geminiService');

exports.newConversation=async(req,res)=>{

    const {prompt}=req.body;   

    try{
      const result = await generateContent(prompt);
      
      res.json({result})
    }
    catch(err){
      console.log(err);
      res.status(500).json({message:err}); 
    }
    
};