const express = require("express");
const app = express();
const cors = require("cors");
const router  = require("./router/index");
const port = process.env.PORT || 5000;
const handlingError = require('./middleware/errorhandler')

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router)
router.use(handlingError)
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});