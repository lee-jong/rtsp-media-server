import { Request, Response, NextFunction } from "express";
import { tokenVerify } from "../lib/token";

const excepPath = ["/token", "/ping"];
const iterceptor = (req: Request, res: Response, next: NextFunction) => {
  next();
  // try {
  //   const { authorization } = req.headers;
  //   if (!authorization) return next(400);
  //   const tokeVaild = tokenVerify(authorization);
  //   const excepVaild = excepPath.some((path) => path == req.originalUrl);
  //   if (excepVaild || tokeVaild) return next();
  //   next(401);
  // } catch (e) {
  //   next(500);
  // }
};

export default iterceptor;
