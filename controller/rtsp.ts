import { Request, Response } from "express";
import global from "../util/global";

export const getRtspInfo = (_req: Request, res: Response) => {
  const data = {
    client_total: global.rtspClients,
    rtsp_info: global.rtspInfo,
  };

  global.logger.info("GET - RTSP INFO", data);
  return res.json({
    status: 200,
    data,
  });
};
