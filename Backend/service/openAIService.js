const { OpenAI } = require('openai');

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey:
    "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",
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