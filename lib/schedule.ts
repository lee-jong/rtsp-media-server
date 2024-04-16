import schedule from "node-schedule";
import moment from "moment";
import path, { join } from "path";
import fs from "fs";
import global from "../util/global";

// Log File - 정시에 확인 후 제거
schedule.scheduleJob("0 0 0 * * *", () => {
  try {
    const dirPath = join(__dirname, "../logs");
    const savePeriod = 14; // 저장 기간
    fs.readdir(dirPath, (err, fileList) => {
      fileList.map((logFile) => {
        const name = logFile.split(".")[0]; // 확장자 제거
        const diffDay = moment.duration(moment().diff(moment(name))).asDays();
        if (diffDay <= savePeriod) return;
        const filePath = path.join(dirPath, logFile);
        fs.unlink(filePath, (err) => {
          if (err) global.logger.error(`${logFile} 로그 파일 제거 실패`);
        });
      });
    });
  } catch (e) {
    global.logger.error(`로그 파일 제거 중 실패`);
  }
});
