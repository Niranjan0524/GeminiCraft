const { GoogleGenerativeAI } = require("@google/generative-ai");

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

const createMessagesString = (messages) => {
  const messageList = [SYSTEM_PROMPT, ...messages];
  return messageList.map((message) => 
    `${message.role}:${message.content}`).join("\n");
  };


const generateContent = async (
  prompt,
  modelName = "gemini-2.0-flash",
  messages = []
) => {
  console.log("Prompt:", prompt);
  console.log("Model Name:", modelName);
  console.log("Messages:", messages);

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
  console.log("Prompt for Title:", prompt);
 
  const model = genAI.getGenerativeModel({ model: modelName });
    
  const titlePrompt=createMessagesString([TITLE_PROMPT,{role:"user",content:prompt}]);
  console.log("Title Prompt:");
  try{
    console.log("hello");
    const title=await model.generateContent(titlePrompt);
    console.log("Title:",title.response.text());
    return title.response.text();
  }
  catch(error){
    console.error("Error in generating title",error);
    return {error:error.message}; 
  }
   
}

module.exports = { generateContent ,generateTitle};