import { Request, Response } from "express";
import Global from "../util/global";
import { jwtSign } from "../lib/token";
import { handleStatus } from "../util/status";

export const getToken = async (req: Request, res: Response) => {
  try {
    const { id, pw } = req.body;
    const { ID, PW } = process.env;
    if (!id || !pw) throw 400;
    if (id !== ID || pw !== PW) throw 400;
    return res.status(200).json({ token: jwtSign() });
  } catch (e: any) {
    res.status(e).json(handleStatus(e));
  } finally {
    Global.logger.info("POST - TOKEN", req.body);
  }
};
