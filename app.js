if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");
const cors = require("cors");
const { urlencoded } = require("express");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
