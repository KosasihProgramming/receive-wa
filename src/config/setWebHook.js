// config/setWebhook.js

const axios = require("axios");

axios
  .post("https://api.watzap.id/v1/set_webhook", {
    api_key: "C6E5LRGZKQIWLTQP",
    number_key: "veECpkJBvMQ0GFDE",
    endpoint_url: "http://202.157.189.177:5005/webhook",
  })
  .then((response) => {
    console.log("Webhook set successfully:", response.data);
  })
  .catch((error) => {
    console.error("Error setting webhook:", error);
  });
