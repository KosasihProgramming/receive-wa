const axios = require("axios");
const moment = require("moment");
const { connectionTeluk } = require("../config/Database.js");
const path = require("path");

require("moment/locale/id"); // Mengimpor bahasa Indonesia untuk moment.js

// Mengatur locale ke bahasa Indonesia
moment.locale("id");

const sendMessageWa = async (data, text) => {
  try {
    const response = await axios.post(
      "https://api.watzap.id/v1/send_message",
      {
        api_key: "C6E5LRGZKQIWLTQP", // Ganti dengan API key Anda
        number_key: "veECpkJBvMQ0GFDE", // Ganti dengan number key Anda
        phone_no: formatPhoneNumber(data.no_telpon), // Ganti dengan nomor tujuan
        // phone_no: "6281278965100", // Ganti dengan nomor tujuan
        message: text, // Ganti dengan pesan yang ingin dikirim
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Pesan berhasil dikirim:", response.data);
    return {
      success: true,
      data: response.data,
      // nama: data.nama,
      no_telpon: data.no_telpon,
    };
  } catch (error) {
    console.error("Gagal mengirim pesan:", error);
    return {
      success: false,
      error: error.message,
      // nama: data.nama,
      no_telpon: data.no_telpon,
    };
  }
};

// Fungsi untuk menyimpan data ke file JSON
const saveToJsonFile = (fileName, data) => {
  const filePath = path.join(__dirname, "..", "data", fileName);
  let fileData = [];

  // Baca file JSON yang sudah ada
  if (fs.existsSync(filePath)) {
    const existingData = fs.readFileSync(filePath);
    fileData = JSON.parse(existingData);
  }

  // Tambahkan data baru
  fileData.push(data);

  // Tulis kembali ke file JSON
  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), "utf8");
};

function formatPhoneNumber(input) {
  // Hilangkan spasi, tanda hubung, dan karakter yang tidak diperlukan
  let cleaned = input.replace(/\D/g, "");

  // Periksa jika nomor dimulai dengan '62', lalu ubah menjadi '0'
  if (cleaned.startsWith("62")) {
    cleaned = "0" + cleaned.slice(2);
  }

  return cleaned;
}
const sendMessageWaGts = async (cabang, data) => {
  const text = `Selamat datang di Griya Terapi Sehat ${cabang}, Bapak/Ibu ${data.nama} ☺️🙏 \n \n Terimakasih sudah percayakan Griya Terapi Sehat sebagai solusi pengobatan anda😊 \n \n  Bagaimana pelayanan di Griya Terapi Sehat ${cabang} ? \n *Silahkan ketik A atau B.*  \n A. Puas ✅ \n B. Kurang puas \n \n Jika berkenan, *tolong berikan alasan atas pilihan Anda Pada Link Dibawah Ini*. Sehat Selalu Bapak/Ibu. Terima kasih 😊👨‍⚕️👩‍⚕️ \nhttps://bit.ly/form-penilaian-kosasih`;
  console.log("GTS", cabang);

  try {
    const response = await axios.post(
      "https://api.watzap.id/v1/send_message",
      {
        api_key: "C6E5LRGZKQIWLTQP", // Ganti dengan API key Anda
        number_key: "veECpkJBvMQ0GFDE", // Ganti dengan number key Anda
        phone_no: formatPhoneNumber(data.no_telpon), // Ganti dengan nomor tujuan
        // phone_no: "6281278965100", // Ganti dengan nomor tujuan
        message: text, // Ganti dengan pesan yang ingin dikirim
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Pesan berhasil dikirim:", response.data);
    return response.data;
  } catch (error) {
    console.error("Gagal mengirim pesan:", error);
    return error;
  }
};
const formatTanggal = (tanggal) => {
  const tahun = tanggal.getFullYear();
  const bulan = String(tanggal.getMonth() + 1).padStart(2, "0"); // Bulan mulai dari 0
  const hari = String(tanggal.getDate()).padStart(2, "0");
  return `${tahun}-${bulan}-${hari}`;
};
const getDataGroup = (data, transaksi) => {
  const result = transaksi.map((b) => {
    const profil = data.find((p) => p.norm == b.id);

    // // Menampilkan norm dari data dan id dari transaksi pada setiap iterasi
    // console.log(
    //   `norm: ${profil ? profil.norm : "Tidak ditemukan"}, id: ${b.id}`
    // );

    return {
      id: b.customerid,
      nama: b.name,
      no_telpon: profil ? profil.telp : "0",
    };
  });
  return result;
};

const getTanggalInfo = async () => {
  const queryGetTanggalHariIni = `SELECT CURDATE() AS today`;

  try {
    const [resultTanggalHariIni] = await connectionTeluk.query(
      queryGetTanggalHariIni
    );

    // Mendapatkan tanggal hari ini dari hasil query
    const tanggalHariIni = moment(resultTanggalHariIni[0].today);

    // Mendapatkan tanggal sehari sebelum tanggal hari ini
    const tanggalKemarin = tanggalHariIni.clone().subtract(1, "days");

    // Mendapatkan tanggal awal bulan ini
    const tanggalAwalBulan = tanggalHariIni.clone().startOf("month");

    // Mendapatkan tanggal akhir bulan ini
    const tanggalAkhirBulan = tanggalHariIni.clone().endOf("month");

    // Mendapatkan jam sekarang
    const jamSekarang = moment().format("HH:mm");

    // Format tanggal awal dan akhir bulan
    const tanggalAwalBulanFormatted = tanggalAwalBulan.format("YYYY-MM-DD");
    const tanggalAkhirBulanFormatted = tanggalAkhirBulan.format("YYYY-MM-DD");
    const tanggalKemarinFormatted = tanggalKemarin.format("DD MMMM YYYY");
    const tanggalKemarinISOFormatted = tanggalKemarin.format("YYYY-MM-DD");
    const bulan = tanggalKemarin.format("MMMM");
    const tahun = tanggalKemarin.format("YYYY");

    const tanggalInfo = {
      tanggalHariIni: tanggalHariIni.format("DD MMMM YYYY"),
      tanggalKemarin: tanggalKemarinFormatted,
      tanggalKemarinISO: tanggalKemarinISOFormatted,
      tanggalAwalBulan: tanggalAwalBulanFormatted,
      tanggalAkhirBulan: tanggalAkhirBulanFormatted,
      bulan: bulan,
      tahun: tahun,
      jamSekarang: jamSekarang,
    };

    return tanggalInfo;
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendMessage = async (text) => {
  try {
    const fetch = await import("node-fetch");

    const response = await fetch.default(
      "https://api.telegram.org/bot6823587684:AAE4Ya6Lpwbfw8QxFYec6xAqWkBYeP53MLQ/sendMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: "-1001812360373",
          message_thread_id: "531",
          text: text,
          parse_mode: "html",
        }),
      }
    );

    // Cek apakah respons dari fetch adalah OK (status code 200)
    if (response.ok) {
      console.log("berhasilllllll");
    } else {
      console.log("gagalllllll");
    }
  } catch (error) {
    // Tangani kesalahan yang terjadi selama fetch
    console.error("Error:", error);
    // alert("Terjadi kesalahan. Silakan coba lagi.");
  }
};
module.exports = {
  sendMessageWa,
  sendMessageWaGts,
  sendMessage,
  getTanggalInfo,
  getDataGroup,
  saveToJsonFile,
};
