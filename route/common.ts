import express from "express";
import { ping } from "../controller/common";

const router = express.Router();

router.route("/ping").get(ping);

export default router;
