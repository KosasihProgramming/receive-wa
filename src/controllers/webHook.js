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
const { sendMessage, sendMessageWa } = require("../functions/Utils");
const fs = require("fs");

exports.handleIncomingMessage = (req, res) => {
  const incomingData = req.body;
  const filePath = path.join(__dirname, "../receivedData.json");
  console.log("request", req.body);

  const dataReceive = incomingData.data;

  if (
    dataReceive.is_from_me == false &&
    dataReceive.name !== "status" &&
    dataReceive.message_body !== "" &&
    dataReceive.message_body !== undefined
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

  if (
    dataReceive.is_from_me == false &&
    dataReceive.name !== "status" &&
    (dataReceive.message_body == "A." ||
      dataReceive.message_body == "A" ||
      dataReceive.message_body == "A. Puas" ||
      dataReceive.message_body == "A.Puas" ||
      dataReceive.message_body.includes("Puas") ||
      dataReceive.message_body.includes("puas"))
  ) {
    const text = `Terima kasih atas penilaian Anda, 😊🙏 Kami senang Anda puas dengan pelayanan kami.\n\nJika berkenan, silakan beri komentar atau saran langsung lewat pesan ini, atau isi form di: https://bit.ly/form-penilaian-kosasih. Masukan Anda sangat berarti bagi kami.\nSehat selalu untuk Anda dan keluarga! 🌿👨‍⚕️👩‍⚕️`;

    sendMessageWa({ no_telpon: dataReceive.name }, text);
  }
  if (
    dataReceive.is_from_me == false &&
    dataReceive.name !== "status" &&
    (dataReceive.message_body == "B" ||
      dataReceive.message_body == "B." ||
      dataReceive.message_body.includes("Kurang puas") ||
      dataReceive.message_body == "B. Kurang Puas" ||
      dataReceive.message_body == "B.Kurang Puas" ||
      dataReceive.message_body == "B. Kurang puas" ||
      dataReceive.message_body.includes("B.Kurang puas") ||
      dataReceive.message_body.toLowerCase().includes("kurang puas") ||
      dataReceive.message_body == "Kurang puas")
  ) {
    const text = `Terima kasih atas tanggapan Anda🙏, Kami mohon maaf jika pelayanan kami belum memenuhi harapan Anda.\n\nKami sangat menghargai jika Anda dapat memberikan masukan lebih lanjut mengenai pengalaman Anda, agar kami bisa segera memperbaiki dan meningkatkan layanan kami. Silakan balas pesan ini atau isi form di: https://bit.ly/form-penilaian-kosasih.\nSehat selalu untuk Anda dan keluarga! 🌿👨‍⚕️👩‍⚕️`;

    sendMessageWa({ no_telpon: dataReceive.name }, text);
  }
};
