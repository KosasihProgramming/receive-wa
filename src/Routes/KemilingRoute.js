const express = require("express");
const {
  getTransaksi,
  sendWa,
} = require("../controllers/KemilingController.js");

const router = express.Router();

router.get("/kemiling/transaksi", getTransaksi);
router.get("/kemiling/send", sendWa);

module.exports = router;
