const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const bodyParser = require("body-parser");
const webhookRoutes = require("./src/Routes/webHookRoutes");
const KemilingRoute = require("./src/Routes/KemilingRoute");
const GtsKemilingRoute = require("./src/Routes/GtsKemilingRoute");
const GtsTirtaRoute = require("./src/Routes/GtsTirtayasaRoute");
const GadingRoute = require("./src/Routes/GadingRoute");
const BugisRoute = require("./src/Routes/BugisRoute");
const RajabasaRoute = require("./src/Routes/RajabasaRoute");
const RunRoute = require("./src/Routes/RunAllRoute");
const UripRoute = require("./src/Routes/UripRoute");
const TuguRoute = require("./src/Routes/TuguRoute");
const TirtayasaRoute = require("./src/Routes/TirtayasaRoute");
const PanjangRoute = require("./src/Routes/PanjangRoute");
const TelukRoute = require("./src/Routes/TelukRoute");
const PalapaRoute = require("./src/Routes/PalapaRoute");

const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Menambahkan handler untuk root path
app.get("/", (req, res) => {
  res.send("Selamat datang di server Express!");
});

// Menggunakan route yang telah diimport
app.use(webhookRoutes);
app.use(KemilingRoute);
app.use(GtsKemilingRoute);
app.use(GtsTirtaRoute);
app.use(GadingRoute);
app.use(BugisRoute);
app.use(RajabasaRoute);
app.use(RunRoute);
app.use(UripRoute);
app.use(TuguRoute);
app.use(TirtayasaRoute);
app.use(PanjangRoute);
app.use(TelukRoute);
app.use(PalapaRoute);

// Menjadwalkan cron job

const urls = [
  `http://localhost:5000/bugis/send`,
  `http://localhost:5000/gading/send`,
  `http://localhost:5000/kemiling/send`,
  `http://localhost:5000/palapa/send`,
  `http://localhost:5000/panjang/send`,
  `http://localhost:5000/rajabasa/send`,
  `http://localhost:5000/teluk/send`,
  `http://localhost:5000/tirta/send`,
  `http://localhost:5000/tugu/send`,
  `http://localhost:5000/urip/send`,
  `http://localhost:5000/gts-kemiling/send`,
  `http://localhost:5000/gts-tirta/send`,
];

let currentIndex = 0;

// Jadwalkan cron job untuk bergantian mengakses URL setiap 30 menit, dimulai jam 9 pagi
// Jadwalkan cron job untuk bergantian mengakses URL setiap 30 menit, dimulai jam 14.00 sampai 17.30
cron.schedule("0,30 10-17 * * *", async () => {
  try {
    // Menggunakan fetch dengan import dinamis
    const fetch = (...args) =>
      import("node-fetch").then(({ default: fetch }) => fetch(...args));
    const url = urls[currentIndex];
    console.log(`Mengakses: ${url}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log("Response:", data);

    // Update indeks untuk mengakses URL berikutnya
    currentIndex = (currentIndex + 1) % urls.length;
  } catch (error) {
    console.error("Error:", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di port: ${port}`);
});
