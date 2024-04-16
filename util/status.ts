export const handleStatus = (code: number | string) => {
  const status = require("../json/status-codes.json");
  return status[code];
};
