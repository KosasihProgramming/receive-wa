const express = require("express");
const {
  getTransaksi,
  sendWa,
} = require("../controllers/GTSTirtayasaController");

const router = express.Router();

router.get("/gts-tirta/transaksi", getTransaksi);
router.get("/gts-tirta/send", sendWa);

module.exports = router;
