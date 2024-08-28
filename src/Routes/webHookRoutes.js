// routes/webhookRoutes.js

const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webHook");
const fs = require("fs");
const path = require("path");

// Define route for webhook
router.post("/webhook", webhookController.handleIncomingMessage);

// Route tambahan untuk melihat data yang sudah diterima
router.get("/show-data", (req, res) => {
  const filePath = path.join(__dirname, "../receivedData.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data");
      return;
    }
    res.send(`<pre>${data}</pre>`); // Menampilkan data dalam format JSON di browser
  });
});
module.exports = router;
