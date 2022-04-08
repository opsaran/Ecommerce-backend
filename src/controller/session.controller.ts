import { NextFunction, Request, Response } from "express";
import { signJwt } from "../utils/jwt.utils";
import {
  createSession,
  findSessions,
  modifySession,
} from "../services/session.service";
import { validatePassword } from "../services/user.service";
import config from "config";

export async function createUserSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //validating the password
  const user = await validatePassword(req.body);
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });

  //session creation
  const userId = user._id as unknown as string;
  const session = await createSession(userId, req.get("user-agent") || "");

  //access token creation

  const accessToken = signJwt(
    {
      name: user.firstName + " " + user.lastName,
      email: user.email,
      _id: user._id,
      session: session._id,
    },
    { expiresIn: config.get<string>("accessTokenTtl") }
  );

  //refresh token creation
  const refreshToken = signJwt(
    {
      name: user.firstName + " " + user.lastName,
      email: user.email,
      _id: user._id,
      session: session._id,
    },
    { expiresIn: config.get<string>("refreshTokenTtl") }
  );
  const fullname = user.firstName + " " + user.lastName;
  console.log("before setting up accesstoken, in session.controller");
  //setting the cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.cookie("accessToken", accessToken, {
    maxAge: config.get("refreshTokenCookieMaxAge"),
    domain: "memazon.netlify.app",
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: true,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: config.get("refreshTokenCookieMaxAge"), //1 year
    domain: "memazon.netlify.app",
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: true,
  });

  //sending accessToken and refreshToken
  res.setHeader("Authorization", accessToken);
  res.setHeader("x-refresh", refreshToken);
  return res.status(200).json({ success: true, name: fullname });
}

export async function getUserSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.status(200).json({ success: true, sessions });
}

export async function deleteUserSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await modifySession({ _id: res.locals.user.session }, { valid: false });
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json({ success: true });
}
