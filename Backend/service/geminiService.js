const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const generateContent = async (prompt) => {
  console.log("Prompt:", prompt);

  try {
    const result = await model.generateContent(prompt);
    
    return {
      response: result.response.text()
    };
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


module.exports = { generateContent };