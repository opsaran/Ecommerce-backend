export default {
  port: 8000,
  origin: ``,
  dbUri: ``,
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  accessTokenCookieMaxAge: 24 * 60 * 60 * 1000, //24hrs
  refreshTokenCookieMaxAge: 3.154e10, //1year
  privateKey: ``,
  publicKey: ``,
};
