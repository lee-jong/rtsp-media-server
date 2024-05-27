import express from "express";
import Rtsp from "./lib/rtsp";
import route from "./route/index";
import interceptor from "./interceptor/index";
import errorHandle from "./interceptor/error";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import "./lib/schedule";
import ApiDocs from "./swagger";

const app = express();
const http = require("http").Server(app);
const port = 4000;
const getSwaggerOption = () => {
  const apiDocs = new ApiDocs();
  apiDocs.init();
  return apiDocs.getSwaggerOption();
};
const { swaggerUI, specs, setUpOption } = getSwaggerOption();

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(specs, setUpOption));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(interceptor);
app.use(errorHandle);

route(app);
http.listen(port, () => {
  // new Rtsp("rtsp://192.168.144.25:8554/main.264", 9999).init();
  new Rtsp("rtsp://210.99.70.120:1935/live/cctv007.stream", 9999).init();
  // new Rtsp("rtsp://210.99.70.120:1935/live/cctv005.stream", 9998).init();
  console.log(`connected at ${port}`);
});
