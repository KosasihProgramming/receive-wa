const express = require("express");
const { getTransaksi, sendWa } = require("../controllers/RajabasaController");

const router = express.Router();

router.get("/rajabasa/transaksi", getTransaksi);
router.get("/rajabasa/send", sendWa);

module.exports = router;
