const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// Redirect URI (called after user authorizes app)
app.get("/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  try {
    const tokenResponse = await axios.post("https://accounts.salla.sa/oauth2/token", {
      grant_type: "authorization_code",
      code,
      client_id: process.env.SALLA_CLIENT_ID,
      client_secret: process.env.SALLA_CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI
    });

    console.log("✅ Access Token Response:", tokenResponse.data);

    res.send("🎉 Authorization successful! You can close this window.");
  } catch (error) {
    console.error("❌ Error getting token:", error.response?.data || error.message);
    res.status(500).send("Error exchanging code for token");
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Zyada.io Auth server is running.");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
