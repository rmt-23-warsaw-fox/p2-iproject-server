if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const router = require("./routes");
const port = process.env.PORT || 3000;
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log("This app is running at port:", port);
});
