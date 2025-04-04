const { MongoClient } = require("mongodb");
const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri);

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// Webhook: استلام التوكن عند التثبيت
app.post("/webhooks/authorize", (req, res) => {
  try {
    console.log("🔥 Webhook Triggered!");
    console.log("📦 Full Body:", req.body);

    const data = req.body.data;

    if (!data || !data.access_token) {
      console.log("❌ Missing access_token in webhook!");
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("✅ Access Token:", data.access_token);
    console.log("🔁 Refresh Token:", data.refresh_token);
    console.log("🛍️ Store ID:", data.store_id || req.body.merchant);

    // هنا ممكن نحفظ التوكن في قاعدة بيانات لاحقًا

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Error handling webhook:", err);
    res.sendStatus(500);
  }
});

// للفحص
app.get("/", (req, res) => {
  res.send("🚀 Webhook-only auth server is running.");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
