// // controllers/webhookController.js

// exports.handleIncomingMessage = (req, res) => {
//   const incomingData = req.body;

//   console.log("Received webhook data:", incomingData);

//   if (incomingData.type === "incoming_chat") {
//     const chatMessage = incomingData.data.message_body;
//     const senderName = incomingData.data.name;

//     // Proses data sesuai kebutuhan Anda
//     console.log(`Pesan masuk dari ${senderName}: ${chatMessage}`);

//     // Contoh: Mengirim balasan otomatis (opsional)
//     // sendReply(incomingData.data.chat_id, 'Terima kasih atas pesannya!');

//     // Kirim response ke Watzap untuk menandakan bahwa request diterima
//     res.status(200).send("Webhook received");
//   } else {
//     res.status(400).send("Unsupported webhook event");
//   }
// };

const path = require("path");
const { sendMessage } = require("../functions/Utils");
const fs = require("fs");

exports.handleIncomingMessage = (req, res) => {
  const incomingData = req.body;
  const filePath = path.join(__dirname, "../receivedData.json");
  console.log("request", req.body);

  const dataReceive = incomingData.data;

  if (
    dataReceive.is_from_me == false &&
    dataReceive.name !== "status" &&
    dataReceive.message_body !== ""
  ) {
    const text = `<b>Chat Dari Pasien </b>\n<b>No. WA. Pasien :</b> ${dataReceive.name} \n<b>Pesan</b> : ${dataReceive.message_body}`;

    sendMessage(text)
      .then(() => {
        // Mengirimkan respons JSON setelah pesan berhasil dikirim
        return res.json({
          success: true,
          message: "Pesan berhasil dikirim",
          sentMessage: text,
        });
      })
      .catch((error) => {
        // Mengirimkan respons JSON jika terjadi kesalahan saat mengirim pesan
        return res.status(500).json({
          success: false,
          message: "Gagal mengirim pesan",
          error: error.message,
        });
      });
  }
};
