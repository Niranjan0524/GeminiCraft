const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = {
  role: "system",
  content:
    "Behave like a pro and your answer should accurate and must be attractive and engaging to the user. You can use the following information to generate the content. make sure not to make it too much lengthy medium type conversation is ok. ",
};


const TITLE_PROMPT={
  role:"system",
  content:"generate a title for given below content of the user no more than 4 words to make it heading of the conversation."
}

const createMessagesString = (messages) => {
  const messageList = [SYSTEM_PROMPT, ...messages];
  return messageList.map((message) => 
    `${message.role}:${message.content}`).join("\n");
  };


const generateContent = async (
  prompt,
  modelName = "gemini-1.5-flash",
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


  try{
    const result = await model.generateContent(finalPrompt);
    // console.log("Response in :", result.response.text());
     return {
      response: result.response.text(),
    };
  }
  catch(error){
    return new error;
  }
 
  
};


const generateTitle=async(prompt,modelName)=>{

   const model = genAI.getGenerativeModel({ model: modelName });
    
  const titlePrompt=createMessagesString([TITLE_PROMPT,{role:"user",content:prompt}]);
  const title=await model.generateContent(titlePrompt);

   return title.response.text();
}

module.exports = { generateContent ,generateTitle};