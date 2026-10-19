const express = require("express");

const app = express();
app.use(express.json({ limit: "1mb" }));

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.status(200).send("WhatsApp webhook backend is running.");
});

// Meta calls this GET endpoint to verify the Callback URL.
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && VERIFY_TOKEN && token === VERIFY_TOKEN) {
    console.log("Webhook verified successfully.");
    return res.status(200).send(challenge);
  }

  console.warn("Webhook verification failed.");
  return res.sendStatus(403);
});

// Meta sends incoming WhatsApp events to this POST endpoint.
app.post("/webhook", (req, res) => {
  // Respond quickly so Meta does not retry the event.
  res.sendStatus(200);

  try {
    const body = req.body;
    console.log("WhatsApp webhook event received:", JSON.stringify(body));

    // Next step: add logic here to process incoming messages or send replies.
    // Do not put access tokens or other secrets in this file.
  } catch (error) {
    console.error("Error processing webhook event:", error.message);
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Webhook backend listening on port ${PORT}`);
});
