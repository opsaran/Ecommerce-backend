import config from "config";
import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import sessionModel, {
  sessionDocumentInterface,
} from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
  const session = await sessionModel.create({ user: userId, userAgent });
  return session.toJSON();
}

export async function findSessions(
  query: FilterQuery<sessionDocumentInterface>
) {
  const sessions = await sessionModel.find(query).lean();
  return sessions;
}

export async function modifySession(
  query: FilterQuery<sessionDocumentInterface>,
  update: UpdateQuery<sessionDocumentInterface>
) {
  return await sessionModel.updateOne(query, update);
}

export async function reIssueAccessToken(refreshToken: string) {
  const { expired, decodedToken } = verifyJwt(refreshToken);

  if (expired || !decodedToken || !get(decodedToken, "session")) return false;
  const sessionId = get(decodedToken, "session");
  const session = await sessionModel.findById(sessionId);
  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });
  if (!user) return false;
  // console.log("during issuing new access token. user: ", user);
  const newAccessToken = signJwt(
    {
      name: user.firstName + " " + user.lastName,
      email: user.email,
      _id: user._id,
      session: session._id,
    },
    { expiresIn: config.get<string>("accessTokenTtl") }
  );
  // console.log("signing new access token: ", newAccessToken);

  return newAccessToken;
}
