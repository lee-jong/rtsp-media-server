import express from "express";
import { getRtspInfo } from "../controller/rtsp";
const router = express.Router();

router.route("/info").get(getRtspInfo);
export default router;
