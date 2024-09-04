const express = require("express");
const { getTransaksi, sendWa } = require("../controllers/TelukController");

const router = express.Router();

router.get("/teluk/transaksi", getTransaksi);
router.get("/teluk/send", sendWa);

module.exports = router;




