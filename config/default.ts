export default {
  port: 8000,
  origin: "http://localhost:3000",
  dbUri: "mongodb://localhost:27017/brandstore",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  accessTokenCookieMaxAge: 24 * 60 * 60 * 1000, //24hrs
  refreshTokenCookieMaxAge: 3.154e10, //1year
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIBOQIBAAJASsCGQ+Rk4LHzTZx30UEZKhpNy+CRJMMuXzrkNj4vJLHRHR0DPey/
+roe0pdxEO+1BB0hvU51Km8A7ThTvFPoZQIDAQABAkAiAK9SZKrqdqe4zwrFmboL
p8lpiu4a7dnDIbO7ZM/m/amcmEKNZv/NFvjnI1B0TaG+afW0yjBRIMJQ3g07Bd8B
AiEAketbiVH7EGnve2xbcmFWLTOfJhyAT9kXwjbFVJSt/0ECIQCDJP72BYV05T4J
Sc7eh37kU5LBQL9DSQByra/We/EEJQIgfnddfkZvMmqeBHqFRzzVU5fJ9138Vzfw
P4L4w7WYmAECIFQMl+Lw8vFSIootZYm06RxIe5ujdXEYDlNxAWrDEFqJAiEAhyUA
7y4j0tv5ZLKX0P9kTNtTd3tPfMskssyfTs+JQHM=
-----END RSA PRIVATE KEY-----`,
  publicKey: `-----BEGIN PUBLIC KEY-----
MFswDQYJKoZIhvcNAQEBBQADSgAwRwJASsCGQ+Rk4LHzTZx30UEZKhpNy+CRJMMu
XzrkNj4vJLHRHR0DPey/+roe0pdxEO+1BB0hvU51Km8A7ThTvFPoZQIDAQAB
-----END PUBLIC KEY-----`,
};
