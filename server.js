const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri);

// Webhook: استلام التوكن عند التثبيت
app.post("/webhooks/authorize", async (req, res) => {
  try {
    console.log("🔥 Webhook Triggered!");
    console.log("📦 Full Body:", req.body);

    const data = req.body.data;
    const store_id = data.store_id || req.body.merchant;

    if (!data || !data.access_token) {
      console.log("❌ Missing access_token in webhook!");
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("✅ Access Token:", data.access_token);
    console.log("🔁 Refresh Token:", data.refresh_token);
    console.log("🛍️ Store ID:", store_id);

    // تخزين البيانات في MongoDB
    await client.connect();
    const db = client.db("zyada");
    const stores = db.collection("connected_stores");

    await stores.updateOne(
      { store_id },
      {
        $set: {
          store_id,
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          token_type: data.token_type,
          connected_at: new Date()
        }
      },
      { upsert: true }
    );

    console.log("✅ Store data saved to MongoDB");

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Error handling webhook:", err);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("🚀 Webhook + MongoDB server is running.");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
