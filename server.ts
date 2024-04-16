import express from "express";
import rtsp from "./lib/rtsp";
import route from "./route/index";
import interceptor from "./interceptor/index";
import errorHandle from "./interceptor/error";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import "./lib/schedule";

const app = express();
const http = require("http").Server(app);
const port = 4000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(interceptor);
app.use(errorHandle);

route(app);
http.listen(port, () => {
  rtsp.init();
  console.log(`connected at ${port}`);
});
