const express = require("express");
const { getTransaksi, sendWa } = require("../controllers/BugisController.js");

const router = express.Router();

router.get("/bugis/transaksi", getTransaksi);
router.get("/bugis/send", sendWa);

module.exports = router;
