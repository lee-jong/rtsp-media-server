import { Request, Response } from "express";
import Global from "../util/global";

export const getRtspInfo = (_req: Request, res: Response) => {
  Global.logger.info(
    "GET - RTSP INFO",
    `clients : ${Global.rtspClients} | info : ${Global.rtspInfo}}`
  );

  return res.json({
    status: 200,
    client_total: Global.rtspClients,
    rtsp_info: Global.rtspInfo,
  });
};
