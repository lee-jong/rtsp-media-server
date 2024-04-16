import express from "express";
import rtsp from "./lib/rtsp";
import action from "./route/index";
import interceptor from "./interceptor/index";
import errorHandle from "./interceptor/error";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import "./lib/schedule";

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 4000;

// 특정 도메인 설정
// let corsOptions = {
//   origin: 'https://www.domain.com',
//   credentials: true
// }

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(interceptor);
app.use(errorHandle);

io.on("connection", (socket: any) => {
  console.log("user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnect", socket.id);
  });

  socket.on("data", (data: any) => {
    console.log("data", data);
  });
});

action(app);
http.listen(port, () => {
  rtsp.init();
  console.log(`connected at ${port}`);
});
