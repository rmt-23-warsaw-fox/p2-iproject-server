require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = +process.env.PORT || 3000;
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on port : ${port}`);
});
