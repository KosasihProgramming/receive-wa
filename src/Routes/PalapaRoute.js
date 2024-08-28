const express = require("express");
const { getTransaksi, sendWa } = require("../controllers/PalapaController");

const router = express.Router();

router.get("/palapa/transaksi", getTransaksi);
router.get("/palapa/send", sendWa);

module.exports = router;
