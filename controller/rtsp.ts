import { Request, Response } from "express";
import Global from "../util/global";

export const getRtspInfo = (_req: Request, res: Response) => {
  const data = {
    client_total: Global.rtspClients,
    rtsp_info: Global.rtspInfo,
  };

  Global.logger.info("GET - RTSP INFO", data);
  return res.json({
    status: 200,
    data,
  });
};
