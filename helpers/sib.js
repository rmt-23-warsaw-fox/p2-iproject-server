const sib = require("sib-api-v3-sdk");
require("dotenv").config();

const client = sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];

apiKey.apiKey = process.env.SIB_API;

const transEmailApi = new sib.TransactionalEmailsApi();

async function verification(email, url) {
  try {
    const sender = {
      email: "aegis.five.niner@mail.com",
    };

    const receivers = [
      {
        email: `${email}`,
      },
    ];

    const sent = await transEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Verification email",
      htmlContent: `
      <p>Click to verify your account</p>
      <a href="${url}">Click here</a>
      `,
    });

    console.log(sent);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { verification };
