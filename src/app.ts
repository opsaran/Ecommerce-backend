import express from "express";
// import dotenv from "dotenv";
import config from "config";
import cors from "cors";
import connectMongo from "connect-mongo";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import cookieParser from "cookie-parser";
import deserializeUser from "./middleware/deserializeUser";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: config.get("origin"),
    exposedHeaders: ["Authorization", "x-refresh"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(deserializeUser);

const port = config.get<number>("port");

app.listen(port, async () => {
  logger.info(`Application is running at http://localhost:${port}`);

  await connect();

  routes(app);
});
