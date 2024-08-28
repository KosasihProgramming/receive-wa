const express = require("express");
const {
  getTransaksi,
  sendWa,
} = require("../controllers/GTSKemilingController");

const router = express.Router();

router.get("/gts-kemiling/transaksi", getTransaksi);
router.get("/gts-kemiling/send", sendWa);

module.exports = router;
