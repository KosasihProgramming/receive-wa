const express = require("express");
const { getTransaksi, sendWa } = require("../controllers/UripController");

const router = express.Router();

router.get("/urip/transaksi", getTransaksi);
router.get("/urip/send", sendWa);

module.exports = router;
