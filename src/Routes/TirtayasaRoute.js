const express = require("express");
const { getTransaksi, sendWa } = require("../controllers/TirtayasaController");

const router = express.Router();

router.get("/tirta/transaksi", getTransaksi);
router.get("/tirta/send", sendWa);

module.exports = router;
