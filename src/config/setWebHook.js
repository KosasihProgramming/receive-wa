// config/setWebhook.js

const axios = require("axios");

axios
  .post("https://api.watzap.id/v1/set_webhook", {
    api_key: "C6E5LRGZKQIWLTQP",
    number_key: "veECpkJBvMQ0GFDE",
    endpoint_url: "http://localhost:5000/webhook",
  })
  .then((response) => {
    console.log("Webhook set successfully:", response.data);
  })
  .catch((error) => {
    console.error("Error setting webhook:", error);
  });
