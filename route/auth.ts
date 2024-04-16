import express from "express";
import { getToken } from "../controller/auth";

const router = express.Router();

router.route("/getToken").post(getToken);

export default router;
