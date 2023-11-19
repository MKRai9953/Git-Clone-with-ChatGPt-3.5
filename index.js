//
const OpenAIApi = require("openai");
const express = require("express");
console.log("Hello");
const openai = new OpenAIApi({
  organization: "org-2oXOXmYEm1eV6WSdI8amP8Rb",
  apiKey: "",
});
const bodyParser = require("body-parser");
const cors = require("cors");
// const response = await openai.listEngines();
// console.log(configuration);

// create a simple express api that requires the function above

const app = express();
const port = 3080;
// adding cors to express

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  console.log(response.data.data);
  res.json({ models: response.data.data });
});

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log(message);
  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });

  // console.log(completion);
  res.json({
    message: completion.choices[0].text,
    // data: message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
