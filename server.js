app.post("/webhooks/authorize", (req, res) => {
  try {
    console.log("🔥 Webhook Triggered!");
    console.log("📦 Full Body:", req.body);

    const data = req.body.data;

    if (!data || !data.access_token) {
      console.log("❌ Missing data or access_token!");
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { access_token, refresh_token, token_type, store_id } = data;

    console.log("✅ Webhook received from Salla!");
    console.log("🛍️ Store ID:", store_id);
    console.log("🔑 Access Token:", access_token);
    console.log("🔁 Refresh Token:", refresh_token);
    console.log("🧾 Token Type:", token_type);

    res.sendStatus(200); // ضروري لسلة
  } catch (error) {
    console.error("❌ Error handling Webhook:", error);
    res.sendStatus(500);
  }
});
