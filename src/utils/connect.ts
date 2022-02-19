import mongoose from "mongoose";
import config from "config";
import logger from "./logger";
export default async function connectDb() {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    logger.info("connected to database...");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}
