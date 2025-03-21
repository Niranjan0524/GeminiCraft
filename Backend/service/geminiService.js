const { GoogleGenerativeAI } = require("@google/generative-ai");
const conversation = require("../model/conversation");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = {
  role: "system",
  content:
    "Behave like a pro and your answer should accurate and it should be in maximum 50 - 100 words. ",
};


const TITLE_PROMPT={
  role:"system",
  content:"generate a title for given below content of the user less than 5 words to make it heading of the conversation."
}

const SUMMARY_PROMPT={
  role:"system",
  content:"Summarize the following conversation between the system and the user. The summary should be structured with clear headings, key points, and a conclusion. Ensure that the key details and insights from the conversation are preserved. Format the output as follows:Introduction - A brief overview of the conversation.Key Discussion Points - A list of the main points discussed, categorized if necessary.Conclusion - A concise summary of the key takeaways and final thoughts.'  Here is the conversation':[Insert conversation here]"
}

const createMessagesString = (messages) => {
  const messageList = [SYSTEM_PROMPT, ...messages];
  return messageList.map((message) => 
    `${message.role}:${message.content}`).join("\n");
  };

const createMessagesString2 = (messages) => {
  const messageList = [SUMMARY_PROMPT, ...messages];
  return messageList
    .map((message) => `${message.role}:${message.content}`)
    .join("\n");
};


const generateContent = async (
  prompt,
  modelName = "gemini-2.0-flash",
  messages = []
) => {


  const newPrompt = {
    role: "user",
    content: prompt,
  };

  const finalPrompt = createMessagesString([
    SYSTEM_PROMPT,
    ...messages,
    newPrompt,
  ]);

  const model = genAI.getGenerativeModel({ model: modelName });

  try {
    const result = await model.generateContent(finalPrompt);
    return {
      response: result.response.text(),
    };
  } catch (error) {
    console.error("Error in generating content  ", error);
    return { error: error.message };
  }
};


const generateTitle=async(prompt,modelName)=>{
 
  const model = genAI.getGenerativeModel({ model: modelName });
    
  const titlePrompt=createMessagesString([TITLE_PROMPT,{role:"user",content:prompt}]);
  
  try{
    
    const title=await model.generateContent(titlePrompt);

    return title.response.text();
  }
  catch(error){
    console.error("Error in generating title",error);
    return {error:error.message}; 
  }
   
}

const generateSummary=async(conversation,modelName="gemini-2.0-flash")=>{
  const message="This Feature is Currently In Development,Please try after some time";

  const finalPrompt=createMessagesString2([...conversation.messages]);
  
  const model=genAI.getGenerativeModel({model:modelName});

  try{
    const summary=await model.generateContent(finalPrompt);

    return summary.response.text();
  }
  catch(err){
    console.log("Error in generating summary",err);
    return {error:err.message};
  }
  
 
}

module.exports = { generateContent ,generateTitle,generateSummary};