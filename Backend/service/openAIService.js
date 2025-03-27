const { OpenAI } = require('openai');

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey:process.env.OPENAI_APIKEY,
});

const newAPI = async (prompt) => {
  console.log("Prompt:", prompt);
  const completion = await openai.chat.completions.create({
    model: "openai/gpt-4o",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log(completion);
};


module.exports={newAPI};