const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const { errors } = require("celebrate");

require("dotenv").config();

const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const NotFoundError = require("./utils/NotFoundError");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/news_db");

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use("/", require("./routes/users"));
// app.use("/", require("./routes/clothingitems"));

app.use((req, res, next) => {
  next(new NotFoundError("Page not found"));
});

// enabling the error logger
app.use(errorLogger);
// celebrate error handler
app.use(errors());
// centralized handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app is runnig at port ${PORT}`); // eslint-disable-line
});
