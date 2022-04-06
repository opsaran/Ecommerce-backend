import express from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import cors from "cors";

import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import cookieParser from "cookie-parser";
import deserializeUser from "./middleware/deserializeUser";
const app = express();
app.use(express.json({ limit: 3145728 }));
app.use(
  cors({
    origin: config.get<string>("origin"),
    // exposedHeaders: ["Authorization", "x-refresh"], //required for Header based auth
    credentials: true, //for cookies
    optionsSuccessStatus: 200, //for some some legacy browsers like IE11
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
