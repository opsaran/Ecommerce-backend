import jwt from "jsonwebtoken";
import config from "config";
const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");
export function signJwt(
  object: object,
  signOptions?: jwt.SignOptions | undefined
) {
  console.log("It am here in jwt sign");
  try {
    const signedToken = jwt.sign(object, privateKey, {
      ...(signOptions && signOptions),
      algorithm: "RS256",
    });
    return signedToken;
  } catch (err: any) {
    return err;
  }
}

export function verifyJwt(
  token: string,
  verifyOptions?: jwt.VerifyOptions | undefined
) {
  try {
    console.log("in jwt verify");
    const decodedToken = jwt.verify(token, publicKey, {
      ...(verifyOptions && verifyOptions),
      algorithms: ["RS256"],
    });

    return {
      valid: true,
      expired: false,
      decodedToken,
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decodedToken: null,
    };
  }
}
