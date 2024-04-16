import { Express } from "express";
import auth from "./auth";
import common from "./common";
import rtsp from "./rtsp";

const route = (app: Express) => {
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/common", common);
  app.use("/api/v1/rtsp", rtsp);
};

export default route;
