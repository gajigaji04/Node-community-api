const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const router = require("./routes");
const errorHandler = require("./middlewares/error-handler");

const app = express();
const PORT = process.env.PORT || 3018;

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(PORT, "포트 번호로 서버가 실행되었습니다.");
});
