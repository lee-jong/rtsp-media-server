import express from "express";
import rtsp from "./lib/rtsp";
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
  rtsp.init();
  console.log(`connected at ${port}`);
});
