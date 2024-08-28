const express = require("express");
const { getTransaksi, sendWa } = require("../controllers/PanjangController");

const router = express.Router();

router.get("/panjang/transaksi", getTransaksi);
router.get("/panjang/send", sendWa);

module.exports = router;
