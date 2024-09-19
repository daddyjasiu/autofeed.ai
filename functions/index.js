const { onMessagePublished } = require("firebase-functions/v2/pubsub");
const { https, setGlobalOptions } = require("firebase-functions/v2");
const { defineSecret } = require("firebase-functions/params");
const { axios } = require("axios");

setGlobalOptions({ region: "europe-central2" });

//openAiApiKey.value() to get the key value
const openAiApiKey = defineSecret("OPEN_AI_API_KEY");

exports.generateVideo = onMessagePublished(
  "video-generation-requests",
  async (event) => {
    const base64name = event.data.message.data;

    const name = base64name
      ? Buffer.from(base64name, "base64").toString()
      : "World";

    const story = await fetchStory();

    console.log(story.response);
  },
);

async function fetchStory() {
  try {
    const url = "https://api.openai.com/v1/chat/completions";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiApiKey}`,
    };

    const body = {
      messages: [{ role: "user", content: "Say this is a test" }],
      model: "gpt-4o-mini",
    };

    const response = await axios.post(url, body, { headers });

    if (response.status === 200) {
      return { response: response.data.choices[0].message.content };
    } else {
      throw new https.HttpsError("internal", "Request failed.");
    }
  } catch (error) {
    throw new https.HttpsError("internal", error.message);
  }
}
