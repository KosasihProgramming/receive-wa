const express = require("express");
const { getTransaksi, sendWa } = require("../controllers/GadingController.js");

const router = express.Router();

router.get("/gading/transaksi", getTransaksi);
router.get("/gading/send", sendWa);

module.exports = router;
