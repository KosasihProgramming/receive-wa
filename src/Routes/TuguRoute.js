const express = require("express");
const { getTransaksi, sendWa } = require("../controllers/TuguController");

const router = express.Router();

router.get("/tugu/transaksi", getTransaksi);
router.get("/tugu/send", sendWa);

module.exports = router;
