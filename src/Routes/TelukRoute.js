const express = require("express");
const { getTransaksi, sendWa } = require("../controllers/TelukController");

const router = express.Router();

router.get("/teluk/transaksi", getTransaksi);
router.get("/teluk/send", sendWa);

module.exports = router;



// if (
//     dataReceive.is_from_me == false &&
//     dataReceive.name !== "status" &&
//     dataReceive.message_body !== "" &&
//     dataReceive.message_body !== undefined &&
//     dataReceive.message_body == "A" &&
//     (dataReceive.message_body == "A." ||
//       dataReceive.message_body == "A. Puas" ||
//       dataReceive.message_body == "A.Puas" ||
//       dataReceive.message_body.includes("Puas") ||
//       dataReceive.message_body.includes("puas"))
//   ) {
