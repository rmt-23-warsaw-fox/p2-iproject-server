const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, function () {
  console.log("this app running in port", port);
});
