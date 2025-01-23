const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT={
  role:"system",
  content:"Behave like a programming teaher and your answer should accurate and must be simple and not too lenthy"
}

const createMessagesString = (messages) => {
  const messageList = [SYSTEM_PROMPT, ...messages];
  return messageList.map((message) => 
    `${message.role}:${message.content}`).join("\n");
  };


const generateContent = async (prompt, modelName = "gemini-1.5-flash",messages=[]) => {

 
    const newPrompt={
      role:"user",
      content:prompt
    }

    const finalPrompt=createMessagesString([SYSTEM_PROMPT,...messages,newPrompt]);

    const model = genAI.getGenerativeModel({ model: modelName });

    const result = await model.generateContent(finalPrompt);
    console.log("Response in :", result.response.text());
    return {
      response: result.response.text(),
    };
  
};


module.exports = { generateContent };