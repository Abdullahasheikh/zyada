app.post("/webhooks/authorize", (req, res) => {
  try {
    console.log("🔥 Webhook Triggered!");
    console.log("📦 Full Body:", req.body);

    // جرب القراءة من req.body مباشرة
    const access_token = req.body.access_token || req.body?.payload?.access_token;
    const refresh_token = req.body.refresh_token || req.body?.payload?.refresh_token;
    const store_id = req.body.store_id || req.body?.payload?.store_id;

    if (!access_token || !store_id) {
      console.log("❌ Missing access_token or store_id!");
      return res.status(400).json({ error: "Missing required data" });
    }

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
