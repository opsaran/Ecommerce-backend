import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import config from "config";
import { reIssueAccessToken } from "../services/session.service";

export default async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken =
    get(req, "cookies.accessToken") ||
    get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
  //For first time login with no tokes

  // alternatively  req.headers.authorization

  const refreshToken =
    get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");

  if (!accessToken) return next();

  const { expired, decodedToken } = verifyJwt(
    accessToken,
    config.get("publicKey")
  );

  if (decodedToken) {
    res.locals.user = decodedToken;

    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);
    if (!newAccessToken) return next();
    res.setHeader("Authorization", newAccessToken);
    console.log("before issuing new access token: ");
    res.cookie("accessToken", newAccessToken, {
      maxAge: config.get("refreshTokenCookieMaxAge"), // 24hrs
      domain: "localhost",
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: false,
    });
    const result = verifyJwt(newAccessToken);
    res.locals.user = result.decodedToken;

    return next();
  }

  return next();
}
