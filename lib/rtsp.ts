import Global from "../util/global";

const retryTime = 1000 * 5;
const reconTime = 1000 * 5;

class RTSP {
  IP: string = process.env.host ?? "";
  stream: any = undefined;
  onRetry: boolean = false;
  retryTimer: NodeJS.Timeout | undefined = undefined;
  reconTimer: NodeJS.Timeout | undefined = undefined;
  #streamUrl: string;
  #port: number;
  constructor(streamUrl: string, port: number) {
    this.#streamUrl = streamUrl;
    this.#port = port;
  }

  init = () => {
    try {
      const Stream = require("node-rtsp-stream");
      const ffmpegPath = require("ffmpeg-static");

      this.stream = new Stream({
        name: "원격관람프로그램",
        streamUrl: this.#streamUrl,
        wsPort: this.#port,
        ffmpegPath,
        ffmpegOptions: {
          "-stats": "",
        },
      });
      if (this.stream.changeSpeed) this.stream.changeSpeed(0.5);
      this.stream.on("rtsp_socket_clients", (data: number) => {
        Global.rtspClients = data;
        Global.logger.info("[RTSP] Connect Clients", data);
      });
      this.stream.on("data", (data: any) => {
        console.log("check me!", data);
      });
      this.stream.on("exitWithError", (e: any) => {
        Global.logger.error("[RTSP] Exit With Error", e);
        this.retry();
      });

      this.stream.mpeg1Muxer.on("ffmpegStderr", (data: any) => {
        Global.rtspInfo = data.toString();
      });
      this.stream.mpeg1Muxer.on("mpeg1data", (data: any) => {
        this.clearTimer("reconTimer");
        this.reconTimer = setTimeout(() => {
          if (this.stream) {
            this.retry();
          } else {
            this.init();
          }
        }, reconTime);
      });
    } catch (e) {
      console.log("rtsp stream init error", e);
    }
  };

  retry = () => {
    try {
      Global.logger.info("[RTSP] Retry Init");
      if (this.onRetry) return;
      if (!this.stream) return; // 요청상태가 늦은 경우 - IP 변경이 된 후, stream, socekt 이 끊긴 상태에서도 데이터가 오는 것을 확인하기 위해
      this.stop();
      if (this.IP !== process.env.host) return;
      this.onRetry = true;
      this.stream = undefined;
      this.retryTimer = setTimeout(() => {
        Global.logger.info("[RTSP] Retry");
        this.init();
        this.onRetry = false;
        this.clearTimer("retryTimer");
      }, retryTime);
    } catch (e) {
      Global.logger.error("[RTSP] Stream Retry Error", e);
    }
  };

  clearTimer = (data: "retryTimer" | "reconTimer") => {
    clearTimeout(this[data]);
    this[data] = undefined;
  };

  stop = () => {
    if (!this.stream) return;
    try {
      Global.logger.info("[RTSP] Stop");
      this.stream.stop();
      this.stream = undefined;
    } catch (e) {
      Global.logger.error("[RTSP] Stream Stop Error", e);
    }
  };
}

export default RTSP;
