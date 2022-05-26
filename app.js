const cors = require("cors");
const express = require("express");
const {
  compareHashWithPass,
  createToken,
  readPayload,
} = require("./helpers/helper");
const app = express();
const nodemailer = require("nodemailer");

const { User } = require("./models/index");

const port = process.env.PORT || 3000

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// NODEMAILER
let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "zs3galwwop5pfkig@ethereal.email",
    pass: "pY6kG3QTHcePtvx89v",
  }
});

// REGISTER
app.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await User.create({
      username,
      email,
      password,
    });

    if (!newUser) {
      throw new Error("RF");
    }

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });

    let mailOptions = {
      from: '"movieFikar" <zs3galwwop5pfkig@ethereal.email>', // sender address
      to: newUser.email, // list of receivers
      subject: "Thanks for sign in movieFikar", // Subject line
      text: "Hello " + newUser.username + " Thanks for sign in movieFikar", // plain text body
      html:
        "<b> Hello " + newUser.username + " Thanks for sign in movieFikar</b>", // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email is send");
      }
    });
  } catch (err) {
    next(err);
  }
});

// LOGIN
app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!findUser) {
      throw new Error("LF");
    }

    if (!compareHashWithPass(password, findUser.password)) {
      throw new Error("invalid");
    }

    const payload = {
      id: findUser.id,
      email: findUser.email,
    };

    const token = createToken(payload);

    res.status(200).json({
      access_token: token,
    });
  } catch (err) {
    next(err);
  }
});

// AUTHN
app.use(async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    const payload = readPayload(access_token);

    const findUser = await User.findByPk(payload.id);

    if (!findUser) {
      throw new Error("invalid token");
    }

    req.additionalData = {
      id: findUser.id,
      username: findUser.username,
      email: findUser.email,
    };

    next();
  } catch (err) {
    next(err);
  }
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err, "ini errorrrrrrrrrrrrrrr"); // maaf kalau lupa di komen
  let code = 500;
  let msg = "Internal server error";

  if (err.message === "RF") {
    code = 400;
    msg = "Email is required";
  }

  if (err.message === "LF") {
    code = 400;
    msg = "Email is required";
  }

  if (err.message === "invalid") {
    code = 400;
    msg = "Invalid email/password";
  }

  if (err.message === "invalid token") {
    code = 400;
    msg = "Invalid token";
  }

  if (err.name === "JsonWebTokenError") {
    code = 400;
    msg = "Invalid token";
  }

  res.status(code).json({
    message: msg,
  });
});

app.listen(port, () => {
  console.log(`jalan di port 3000`);
});
