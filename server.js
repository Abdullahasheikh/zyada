const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json()); // لتفكيك البيانات القادمة من سلة

// نقطة استقبال Webhook من سلة
app.post("/webhooks/authorize", (req, res) => {
  try {
    const payload = req.body.payload;

    if (!payload || !payload.access_token) {
      console.log("❌ Webhook received but payload is invalid:", req.body);
      return res.status(400).json({ message: "Invalid payload" });
    }

    const { access_token, refresh_token, store_id } = payload;

    console.log("✅ Webhook received from Salla!");
    console.log("🛍️ Store ID:", store_id);
    console.log("🔑 Access Token:", access_token);
    console.log("🔁 Refresh Token:", refresh_token);

    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error handling Webhook:", error);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("🚀 Zyada.io Webhook server is running.");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
