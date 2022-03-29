const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const sequilize = require("./db");
const router = require("./router/index");
const errorHanler = require("./middleware/error");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(
  cors({
    optionSuccessStatus: 200,
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "static/")));
app.use(fileUpload({}));
app.use("/api", router);
app.use(errorHanler);

const start = async () => {
  try {
    await sequilize.authenticate();
    await sequilize.sync();

    app.listen(process.env.PORT, () =>
      console.log("server launch on " + process.env.PORT)
    );
  } catch (e) {
    console.error(e);
  }
};

start();
