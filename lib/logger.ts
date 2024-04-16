import moment from "moment";
import { join } from "path";
import { createLogger, transports, format } from "winston";
import { SPLAT } from "triple-beam";
const { combine, timestamp, printf } = format;
const myFormat = printf((info) => {
  const { timestamp, level, message } = info;
  let splat;
  if (typeof info[SPLAT] === "object") {
    splat = JSON.stringify(info[SPLAT]);
  } else {
    splat = info[SPLAT];
  }

  const time = moment(timestamp).format("YYYY-MM-DD HH:mm:ss");
  return `${time} - [${level}]: ${message} ${splat ? splat : ""}`;
});

const filename = join(
  __dirname,
  `../logs/${moment().format("YYYY-MM-DD")}.log`
);

/**
 * @Level
 * error : 0 / warn: 1 / info: 2 / verbose: 3 / debug: 4 / silly: 5
 */
const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      level: "error",
      filename,
    }), // error log 파일을 만든다.
    new transports.File({ filename }), // 모든 타입의 log를 찍는다.
  ],
  format: combine(timestamp(), myFormat),
});

export default logger;
