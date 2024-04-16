import { Request, Response } from "express";
import Global from "../util/global";

export const ping = async (req: Request, res: Response) => {
  Global.logger.info("GET - PING");
  res.status(200).json({
    status: 200,
    message: "OK",
  });
};
