import jwt from "jsonwebtoken";
import global from "../util/global";
export const jwtSign = () => {
  const key: string = process.env.API_KEY ?? "";
  const token = jwt.sign(
    {
      type: "JWT",
      nickname: "Jay", // 테스트
    },
    key,
    {} // 만료기한 셋팅 - 임시로 만료기한 없음
  );

  return token;
};

export const tokenVerify = (token: string) => {
  const key: string = process.env.API_KEY ?? "";

  let valid = false;
  jwt.verify(token, key, (err, decoded) => {
    if (err) return (valid = false);
    global.logger.info(decoded);
    return (valid = true);
  });

  return valid;
};
